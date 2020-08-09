const genTableResults = (wordFreqObj, minWordFreq, maxWordFreq) => {
    // [ [ 'the', 22 ], [ 'dogs', 12 ], [ 'ear', 1 ] ]
    let sortedFreqArr = Object.entries(wordFreqObj).map((x) => {
        let [word, freq] = x
        return [word, freq]
    }).sort(function (a, b) {
        return b[1] - a[1];
    }).filter(row => {
        return row[1] >= minWordFreq && row[1] <= maxWordFreq
    });

    const header = `
        <thead>
            <tr>
                <th>Word</th>
                <th>Frequency</th>
            </tr>
        </thead>
    `
    const rows = sortedFreqArr.map(row => {
        return `<tr>
            <td>${row[0]}</td>
            <td>${row[1]}</td>
        </tr>`
    }).join('')

    document.getElementById('resultsTable').innerHTML = header + rows
}

// Todo, min word length filter, max word length filter
const tokenize = (str, minWordLen) => {
    const stopwords = []
    let words = str.split(/\W+/).filter(function (token) {
        return token.length >= minWordLen && stopwords.indexOf(token) == -1;
    }).map(x => x.toLowerCase())
    return words
}

const genWordFreq = (wordsArr) => {
    let counts = {}
    wordsArr.forEach(word => {
        if (word in counts) {
            counts[word] += 1
        } else {
            counts[word] = 1
        }
    })
    return counts
}

// Generalize this method? And add some UI
const genBigrams = (wordsArr) => {
    let toReturn = []
    wordsArr.forEach((word, index, arr) => {
        if (index < arr.length - 1) {
            toReturn.push(`${arr[index]} ${arr[index + 1]}`)
        }
    })
    return toReturn
}

const button = document.getElementById('generate')
document.getElementById('minWordLength').defaultValue = 5;
document.getElementById('maxWordFreq').defaultValue = 100;
document.getElementById('minWordFreq').defaultValue = 2;

button.addEventListener('click', function (e) {
    let scrollButton = document.getElementById('scrollToBottom')
    scrollButton.style.display = 'block';
    scrollButton.addEventListener('click', function (e) {
        window.scrollTo(0, document.body.scrollHeight);
    })
    const textArea = document.getElementById('textArea').value

    let includeBigrams = document.getElementById('includeBigrams').checked
    let minWordLength = parseInt(document.getElementById('minWordLength').value)
    let minWordFreq = parseInt(document.getElementById('minWordFreq').value)
    let maxWordFreq = parseInt(document.getElementById('maxWordFreq').value)

    if (includeBigrams) {
        let unigrams = tokenize(textArea, minWordLength)
        let bigrams = genBigrams(tokenize(textArea, minWordLength))
        let frequencies = genWordFreq(unigrams.concat(bigrams))
        genTableResults(frequencies, minWordFreq, maxWordFreq)
    } else {
        let unigrams = tokenize(textArea)
        let frequencies = genWordFreq(unigrams)
        genTableResults(frequencies, minWordFreq, maxWordFreq)
    }
})