from pathlib import Path
from html.parser import HTMLParser
import urllib.request,urllib.error,urllib.parse,concurrent.futures,xml.etree.ElementTree as ET,json,sys,os,http.cookiejar
class PermanentRedirects(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,req,fp,code,msg,headers,newurl):
  if code==308:return urllib.request.Request(newurl,headers=req.headers,method='GET')
  return super().redirect_request(req,fp,code,msg,headers,newurl)
 http_error_308=urllib.request.HTTPRedirectHandler.http_error_302
handlers=[PermanentRedirects()]
if os.environ.get('FENIKS_PREVIEW_COOKIE_JAR'):
 jar=http.cookiejar.MozillaCookieJar(os.environ['FENIKS_PREVIEW_COOKIE_JAR']);jar.load(ignore_discard=True,ignore_expires=True);handlers.append(urllib.request.HTTPCookieProcessor(jar))
urllib.request.install_opener(urllib.request.build_opener(*handlers))
BASE=sys.argv[1].rstrip('/') if len(sys.argv)>1 else 'http://localhost:4317'
CANONICAL='https://www.feniksstudios.com'
class Page(HTMLParser):
 def __init__(self):super().__init__();self.h1=0;self.canonical=None;self.meta={};self.ld=False;self.buf='';self.schemas=[]
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='h1':self.h1+=1
  if tag=='link' and a.get('rel')=='canonical':self.canonical=a.get('href')
  if tag=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if tag=='script' and a.get('type')=='application/ld+json':self.ld=True;self.buf=''
 def handle_data(self,text):
  if self.ld:self.buf+=text
 def handle_endtag(self,tag):
  if tag=='script' and self.ld:self.schemas.append(json.loads(self.buf));self.ld=False

def fetch(path):
 with urllib.request.urlopen(BASE+path,timeout=25) as response:return response.status,response.read().decode()
_,xml=fetch('/sitemap.xml');root=ET.fromstring(xml);urls=[e.text for e in root.iter() if e.tag.endswith('loc')];failures=[]
def check(url):
 path=urllib.parse.urlsplit(url).path or '/'
 try:
  status,html=fetch(path);page=Page();page.feed(html)
  errors=[]
  if status!=200:errors.append('HTTP '+str(status))
  if page.h1!=1:errors.append('H1 '+str(page.h1))
  if (page.canonical or '').rstrip('/')!=(CANONICAL+path).rstrip('/'):errors.append('canonical '+str(page.canonical))
  if not page.meta.get('description'):errors.append('meta description manquante')
  if not page.meta.get('og:image'):errors.append('image de partage manquante')
  if 'noindex' in page.meta.get('robots',''):errors.append('noindex dans le sitemap')
  for schema in page.schemas:
   if schema.get('@type')=='VideoObject':
    for k in ['name','description','thumbnailUrl','uploadDate','embedUrl']:
     if not schema.get(k):errors.append('VideoObject '+k+' manquant')
  return {'path':path,'status':status,'schemas':[s.get('@type') for s in page.schemas],'errors':errors}
 except Exception as e:return {'path':path,'errors':[str(e)]}
with concurrent.futures.ThreadPoolExecutor(max_workers=4) as pool:pages=list(pool.map(check,urls))
redirects=json.loads(Path('data/legacy-redirects.json').read_text());tested=[]
for item in redirects:
 for slash in ['', '/']:
  source=item['source']+slash
  try:
   with urllib.request.urlopen(BASE+source,timeout=15) as response:
    final=urllib.parse.urlsplit(response.url).path;ok=response.status==200 and final==item['destination'];tested.append({'source':source,'destination':final,'ok':ok})
  except Exception as e:tested.append({'source':source,'ok':False,'error':str(e)})
_,robots=fetch('/robots.txt');assert CANONICAL+'/sitemap.xml' in robots
assert '/mentions-legales' not in robots
_,legal=fetch('/mentions-legales');parser=Page();parser.feed(legal);assert 'noindex' in parser.meta['robots']
try:fetch('/page-inexistante-test-seo');failures.append('Page inexistante sans HTTP 404')
except urllib.error.HTTPError as e:assert e.code==404
failures.extend([p for p in pages if p['errors']]);failures.extend([r for r in tested if not r['ok']])
report={'base':BASE,'sitemap_pages':len(pages),'redirect_variants':len(tested),'failures':failures,'pages':pages,'redirects':tested}
out=Path('/Users/feniksstudios/Desktop/App Bosnie/audit-seo-feniks-2026-10-11/apres');out.mkdir(exist_ok=True);(out/'verification-site.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
print(json.dumps({'sitemap_pages':len(pages),'redirect_variants':len(tested),'failures':failures},ensure_ascii=False))
if failures:sys.exit(1)
