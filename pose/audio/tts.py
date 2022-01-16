import requests
import urllib

def gen(text, file):
    q = {'q':text}
    str = urllib.parse.urlencode(q)
    url = f'http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&{str}&tl=ko'
    r = requests.get(url, allow_redirects=True)
    with open(f'{file}.mp3', 'wb') as f:
        f.write(r.content)

texts = ["하나", "둘", "셋", "넷", "다섯", "여섯", "일곱", "여덟", "아홉", "열",
         "열하나", "열둘", "열셋", "열넷", "열다섯", "열여섯", "열일곱", "열여덟", "열아홉", "스물",
         "스물하나", "스물둘", "스물셋", "스물넷", "스물다섯", "스물여섯", "스물일곱", "스물여덟", "스물아홉", "서른"]

# for i, text in enumerate(texts):
#     gen(text, str(i+1))

# -----------------------------------------

def gen_html():
    for i in range(1,31):
        print(f'<audio id="audio_{i}">')
        print(f'<source src="sound/{i}.mp3" type="audio/mp3">')
        print(f'</audio>')

gen_html()

