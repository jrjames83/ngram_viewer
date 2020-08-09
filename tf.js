// const dot = (a, b) => {
//     var hasOwnProperty = Object.prototype.hasOwnProperty;
//     var sum = 0;
//     for (var key in a) {
//         if (hasOwnProperty.call(a, key) && hasOwnProperty.call(b, key)) {
//             sum += a[key] * b[key]
//         }
//     }
//     return sum
// }

// const similarity = (a, b) => {
//     var magnitudeA = Math.sqrt(this.dot(a, a));
//     var magnitudeB = Math.sqrt(this.dot(b, b));
//     if (magnitudeA && magnitudeB)
//         return this.dot(a, b) / (magnitudeA * magnitudeB);
//     else return false
// }

// const cosine_similarity_matrix = (matrix) => {
//     let cosine_similarity_matrix = [];
//     for (let i = 0; i < matrix.length; i++) {
//         let row = [];
//         for (let j = 0; j < i; j++) {
//             row.push(cosine_similarity_matrix[j][i]);
//         }
//         row.push(1);
//         for (let j = (i + 1); j < matrix.length; j++) {
//             row.push(this.similarity(matrix[i], matrix[j]));
//         }
//         cosine_similarity_matrix.push(row);
//     }
//     return cosine_similarity_matrix;
// }

// // How to group them by similarity?
// // Knearest neighbors?
// // const getEmbeddings = (sentences_list) => {
// //     use.load().then(model => {
// //         model.embed(sentences_list).then(async embeddings => {
// //             const vec = await embeddings.array()
// //             vec.forEach(async (v, index) => {
// //                 vec.forEach(async (v2, index2) => {
// //                     if (index != index2) {
// //                         let distance = await tf.losses.cosineDistance(v, v2, 0).data()
// //                         if (distance < .50 && distance > 0) {
// //                             console.log(distance[0], sentences_list[index], sentences_list[index2])
// //                         }
// //                     }
// //                 })
// //             })
// //         });
// //     });
// // }

// // create a new sheet to find similar phrases (trigrams and bigrams)
// // still unsure how to group them
// const getEmbeddings = async (sentences_list) => {
//     use.load().then(model => {
//         model.embed(sentences_list).then(async embeddings => {
//             const vec = await embeddings.array()
//             for (let i = 0; i < sentences_list.length; i++) {
//                 for (let j = i; j < sentences_list.length; j++) {
//                     if (i !== j) {
//                         // dont compare with the word with itself
//                         const sentenceI = embeddings.slice([i, 0], [1]);
//                         const sentenceJ = embeddings.slice([j, 0], [1]);
//                         const sentenceITranspose = false;
//                         const sentenceJTransepose = true;
//                         const score = sentenceI.matMul(sentenceJ, sentenceITranspose, sentenceJTransepose)
//                             .dataSync();
//                         console.log(sentences_list[i], sentences_list[j], score[0])
//                     }

//                 }
//             }
//         });
//     });
// }

// getEmbeddings([
//     'I walk the dog',
//     'the dog is walking',
//     'tomorrow will be sunny'

// ])


// let testEmbedding = async () => {
//     let matrix = tf.tensor2d([
//         [0, 1, 0],
//         [0, 0, 0],
//         [1, 1, 0]
//     ])
//     console.log(matrix.print())
//     //let matMul = await matrix.matMul(tf.transpose(matrix)).data()
//     let proximity = await tf.dot(matrix, tf.transpose(matrix)).array()
//     console.log(proximity, "Is the proximity")
// }