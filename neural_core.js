class Neural {
    constructor(arr, k, rand, bias) {
        this.neurons = [];
        this.errors = [];
        this.weights = [];
        this.nd = bias;
        this.kl = k;

        for (var i = 0; i < arr.length; i++) {
            let temp1 = [];
            let temp2 = [];

            for (var j = 0; j < arr[i]; j++) {
                temp1.push(0);
                temp2.push(0);
            }

            for (var j = 0; j < this.nd; j++) {
                temp1.push(1);
                temp2.push(0);
            }

            this.neurons.push(temp1);
            this.errors.push(temp2);
        }


        for (var i = 0; i < arr.length - 1; i++) {
            let temp1 = [];
            for (var a = 0; a < arr[i] + this.nd; a++) {
                let temp2 = [];
                for (var b = 0; b < arr[i + 1]; b++) {
                    if (rand) {
                        temp2.push(Math.random());
                    } else {
                        temp2.push(0);
                    }
                }
                temp1.push(temp2);
            }
            this.weights.push(temp1);
        }
        /*
        console.log(this.weights);
        console.log(this.neurons);
        console.log(this.errors);
        */

        console.log('Ядро нейронной сети подключено!');
    } // создать переменную и записать в нее класс

    forWards() {
        for (var i = 0; i < this.weights.length; i++) {
            let Li = this.neurons[i];
            let Lo = this.neurons[i + 1];
            let W = this.weights[i];

            for (let y = 0; y < Lo.length - this.nd; y++) {
                Lo[y] = 0;
                for (let x = 0; x < Li.length; x++) {
                    Lo[y] += Li[x] * W[x][y];
                }
                Lo[y] = 1 / (1 + Math.exp(-Lo[y]));
            }

            this.neurons[i + 1] = Lo;
        }
    } // расчет значений нейронов (перед использованием нужно задать значения нейронам при помощи команды .setValue())

    findError() {
        for (let i = this.errors.length - 2; i >= 1; i -= 1) {
            var errO = this.errors[i + 1];
            var errI = this.errors[i];
            var W = this.weights[i];

            for (let x = 0; x < errI.length - this.nd; x++) {
                errI[x] = 0;
                for (let y = 0; y < errO.length - this.nd; y++) {
                    errI[x] += errO[y] * W[x][y];
                }
            }

            this.errors[i] = errI;
        }

        //console.log(this.errors);
    } // обратное распространение ошибки (перед использованием нужно задать ошибки командой .setError())

    backWards() {
        for (var i = 0; i < this.weights.length; i++) {
            let Li = this.neurons[i];
            let Lo = this.neurons[i + 1];
            let W = this.weights[i];

            let errO = this.errors[i + 1];

            for (let y = 0; y < Lo.length - this.nd; y++) {
                for (let x = 0; x < Li.length; x++) {
                    W[x][y] += this.kl * errO[y] * Lo[y] * (1 - Lo[y]) * Li[x];
                }
            }

            this.weights[i] = W;
        }
    } // обучение сети

    setValue(layer, neuron, data) {
        this.neurons[layer][neuron] = data;
    } // задать значение нейрону

    getValue() {
        return this.neurons;
    } // получить массив со всеми нейронами

    setError(layer, neuron, data) {
        this.errors[layer][neuron] = data;
    } // задать ошибу нейрону

    getData() {
        return this.weights;
    } // получить массив весов связей

    setData(data) {
        this.weights = data;
    }

    getError() {
        return this.errors;
    } // получить массив ошибок

    setK(data) {
        this.kl = data;
    } // задать значение коэфициента обучения

}
