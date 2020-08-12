const genTableResults = (wordFreqObj, minWordFreq, maxWordFreq) => {
    // [ [ 'the', 22 ], [ 'dogs', 12 ], [ 'ear', 1 ] ]
    console.log('Generating table')
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
    const stopwords = ['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now']
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

const genBigrams = (wordsArr) => {
    let toReturn = []
    wordsArr.forEach((word, index, arr) => {
        if (index < arr.length - 1) {
            toReturn.push(`${arr[index]} ${arr[index + 1]}`)
        }
    })
    return toReturn
}

const genTrigrams = (wordsArr) => {
    let toReturn = []
    wordsArr.forEach((word, index, arr) => {
        if (index < arr.length - 2) {
            toReturn.push(`${arr[index]} ${arr[index + 1]} ${arr[index + 2]}`)
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
    let includeTrigrams = document.getElementById('includeTrigrams').checked
    let minWordLength = parseInt(document.getElementById('minWordLength').value)
    let minWordFreq = parseInt(document.getElementById('minWordFreq').value)
    let maxWordFreq = parseInt(document.getElementById('maxWordFreq').value)

    if (includeTrigrams) {
        let unigrams = tokenize(textArea, minWordLength)
        let bigrams = genBigrams(tokenize(textArea, minWordLength))
        let trigrams = genTrigrams(tokenize(textArea, minWordLength))
        let frequencies = genWordFreq(unigrams.concat(bigrams).concat(trigrams))
        genTableResults(frequencies, minWordFreq, maxWordFreq)

    } else if (includeBigrams) {
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