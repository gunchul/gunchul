# NUMPY

## Create

    array = np.array([1, 2, 3])
    array = np.array([[1, 2, 3],[4, 5, 6]])
    array = np.linspace(0, 10, 5)
    array = np.arange(4)
    array = np.zeros((4, 4), dtype=float)
    array = np.ones((3, 3), dtype=str)
    array = np.random.randint(0, 10, (3, 3))
    array = np.random.normal(0, 1, (3, 3))

## Concatenate

    np.concatenate([array1, array2])
    np.concatenate([array1, array2], axis=0)

## Reshape, split

    array = array.reshape((2, 2))
    array = np.arange(8).reshape(2,4)
    left, right = np.split(array, [2], axis = 1)
    up, down = np.split(array, [1], axis = 0)

## Constant와 연산

    array = np.arange(8).reshape(2,4)
    arrayx10 = array * 10

## numpy와 연산

    array1 = np.arange(4).reshape(2, 2)
    array2 = np.arange(2)
    array3 = array1 + array2

## Masking

    array1 = np.arange(16).reshape(4, 4)
    array2 = array1 < 10
    array1[array2] = 100

## 집계

    array = np.arange(16).reshape(4, 4)
    np.max(array)
    np.min(array)
    np.sum(array)
    np.mean(array)

## 저장 및 불러오기

### 배열 한개

    array = np.arange(0, 10)
    np.save('saved.npy', array)
    result = np.load('saved.npy')

### 배열 여러개

    array1 = np.arange(0, 10)
    array2 = np.arange(10, 20)
    np.savez('saved.npz', array1=array1, array2=array2)
    data = np.load('saved.npz')
    result1 = data['array1']
    result2 = data['array2']

## sort

    array.sort()
    array = np.array([[5, 9, 10, 3, 1], [8, 3, 4, 2, 5]])
    array.sort(axis=0)

## ETC

    array1 = np.arange(0, 10)
    array2 = array1.copy()

    array = np.array([1, 1, 2, 3, 3, 3, 1])
    print(np.unique(array))
