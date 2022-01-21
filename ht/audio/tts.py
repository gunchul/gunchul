import requests
import urllib
import os

def str_get(num):
    result = None
    str_1 = {'0':'', '1':'하나', '2':'둘', '3':'셋', '4':'넷', '5':'다섯', '6':'여섯', '7':'일곱', '8':'여덟', '9':'아홉' }
    str_2 = {'0':'', '1':'열', '2':'스물', '3':'서른', '4':'마흔', '5':'쉰', '6':'예슨', '7':'일흔', '8':'여순', '9':'하흔' }

    if (num == 100):
        return "백"

    str_num = str(num)

    if len(str_num) == 1:
        result = str_1[str_num[-1]]
    elif len(str_num) == 2:
        result = str_2[str_num[-2]] + str_1[str_num[-1]]
    return result

def url_get(str):
    q = {'q':str}
    str = urllib.parse.urlencode(q)
    return f'http://translate.google.com/translate_tts?ie=UTF-8&total=1&idx=0&textlen=32&client=tw-ob&{str}&tl=ko'

def file_gen(file_name, text):
    if os.path.exists(file_name):
        return
    url = url_get(text)
    r = requests.get(url, allow_redirects=True)
    print(f'{file_name}:{text}')
    with open(f'{file_name}', 'wb') as f:
        f.write(r.content)
    print(f'{file_name} created')

def count_file_gen():
    for num in range(1,101):
        file_name = f'{num}.mp3'
        text = str_get(num)
        file_gen(file_name, text)

def start_stop_gen():
    file_gen('start.mp3', "시작")
    file_gen('stop.mp3', "끝")

count_file_gen()
start_stop_gen()
