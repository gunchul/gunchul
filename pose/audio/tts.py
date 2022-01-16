import requests
import urllib
import os

def str_get(num):
    result = None
    str_1 = {'0':'', '1':'하나', '2':'둘', '3':'셋', '4':'넷', '5':'다섯', '6':'여섯', '7':'일곱', '8':'여덟', '9':'아홉' }
    str_2 = {'0':'', '1':'열', '2':'스물', '3':'서른', '4':'마흔', '5':'쉰', '6':'여슨', '7':'일흔', '8':'여순', '9':'하흔' }

    if (num == 100):
        return "백"

    str_num = str(num)

    if len(str_num) == 1:
        result = str_1[str_num[-1]]
    elif len(str_num) == 2:
        result = str_2[str_num[-2]] + str_1[str_num[-1]]
    return result

def file_gen(num):
    file_name = f'{num}.mp3'
    if os.path.exists(file_name):
        return
    text = str_get(num)
    q = {'q':text}
    str = urllib.parse.urlencode(q)
    url = f'http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&{str}&tl=ko'
    r = requests.get(url, allow_redirects=True)
    with open(f'{file_name}', 'wb') as f:
        f.write(r.content)

for num in range(1,101):
    file_gen(num)
