# PANDAS

## Create

### Series

    series = pd.Series(['사과','바나나','당근'], index=['a', 'b', 'c'])

    series = {
        'a': '사과',
        'b': '바나나',
        'c': '당근',
    }
    array = pd.Series(data)

### DataFrame

    word_dict = {
        'Apple': '사과',
        'Banana': '바나나',
        'Carrot': '당근'
    }

    frequency_dict = {
        'Apple': 3,
        'Banana': 5,
        'Carrot': 7
    }

    word = pd.Series(word_dict)
    frequency = pd.Series(frequency_dict)

    summary = pd.DataFrame({
        'word': word,
        'frequency': frequency
    }  )

    df = pd.DataFrame([
        ['Apple', 7, 'Fruit'],
        ['Banana', 3, 'Fruit'],
        ['Beef', 5, 'Meal'],
        ['Kimchi', 4, 'Meal']],
        columns=["Name", "Frequency", "Type"])

## 연산

### 연산 후 새로운 행 추가

    word_dict = {
        'Apple': '사과',
        'Banana': '바나나',
        'Carrot': '당근'
    }

    frequency_dict = {
        'Apple': 3,
        'Banana': 5,
        'Carrot': 7
    }

    importance_dict = {
        'Apple': 3,
        'Banana': 2,
        'Carrot': 1
    }

    word = pd.Series(word_dict)
    frequency = pd.Series(frequency_dict)
    importance = pd.Series(importance_dict)

    summary = pd.DataFrame({
        'word': word,
        'frequency': frequency,
        'importance': importance
    })

    score = summary['frequency'] * summary['importance']
    summary['score'] = score

### 슬라이싱

    print(summary.loc['Banana':'Carrot', 'importance':])
    print(summary.iloc[1:3, 2:])

### 데이터 프레임 수정 및 추가

    summary.loc['Apple', 'importance'] = 5
    summary.loc['Elderberry'] = ['엘더베리', 5, 3, 5*3]

### 데이터 프레임 연산

    df = pd.DataFrame([[1, 2, 3, 4], [1, 2, 3, 4]], index=[0, 1], columns=["A", "B", "C", "D"])
    print(df)
    print(df + 1)
    df = df.replace({3:300})
### 정렬

    summary = summary.sort_values('frequency', ascending=False)

### 마스킹

    series_mask = summary['importance'] >= 3)
    print(summary[series_mask])

    print(summary.query("frequency >= 3 and score > 10"))

### 그룹핑

    df = pd.DataFrame([
    ['Apple', 7, 'Fruit'],
    ['Banana', 3, 'Fruit'],
    ['Beef', 5, 'Meal'],
    ['Kimchi', 4, 'Meal']],
    columns=["Name", "Frequency", "Type"])

    print(df)
    print(df.groupby(['Type']).sum())
    print(df.groupby(["Type"]).aggregate([min, max, np.average]))

#### 필터

    df = pd.DataFrame([
        ['Apple', 7, 5, 'Fruit'],
        ['Banana', 3, 6, 'Fruit'],
        ['Beef', 5, 2, 'Meal'],
        ['Kimchi', 4, 8, 'Meal']],
        columns=["Name", "Frequency", "Importance", "Type"])

        def my_filter(data):
            return data["Frequency"].mean() >= 5

        df = df.groupby("Type").filter(my_filter)

### 엑셀

    summary.to_csv("summary.csv", encoding="utf-8-sig")
    saved = pd.read_csv("summary.csv", index_col=0)
    print(saved)

