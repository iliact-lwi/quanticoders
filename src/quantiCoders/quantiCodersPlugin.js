class quantiCodersPlugin {

    // Определение свойств json объекта которые можно изменить при необходимости
    constructor() {
        this.json = {
            employees:
            [
                {"id":1,"name":"Mildred Carson","drinks":["Macchiato"]},
                {"id":2,"name":"Clifford Brown","drinks":["Latte"]},
                {"id":3,"name":"Kellie Fletcher","drinks":["Flat White","Espresso"]},
                {"id":4,"name":"Don Parsons","drinks":["Espresso"]},
                {"id":5,"name":"Renee Reynolds","drinks":["Cappuccino","Macchiato"]},
                {"id":6,"name":"Rudolph Bishop","drinks":["Latte","Macchiato","Flat White"]},
                {"id":7,"name":"Geraldine Carpenter","drinks":["Espresso"]},
                {"id":8,"name":"Hilda Jimenez","drinks":["Latte","Macchiato","Espresso"]},
                {"id":9,"name":"Pauline Roberson","drinks":["Espresso"]},
                {"id":10,"name":"Vanessa Barrett","drinks":["Flat White","Cappuccino","Latte"]}
            ],
            recipes: 
            {
                "Cappuccino": {
                    "coffee": 0.01,
                    "water": 0.035,
                    "milk": 0.09
                },
                "Espresso": {
                    "coffee": 0.01,
                    "water": 0.035
                },
                "Latte": {
                    "coffee": 0.01,
                    "water": 0.035,
                    "milk": 0.135
                },
                "Flat White": {
                    "coffee": 0.02,
                    "water": 0.04,
                    "milk": 0.11
                },
                "Macchiato": {
                    "coffee": 0.01,
                    "water": 0.035,
                    "milk": 0.015
                }
            },
            prices: 
            {
                "coffee": 3.6,
                "water": 1,
                "milk": 1.5
            }              
        }
    }

    // Три основных функции задания
    candies(candy, pineapple, apple, totalWeight) {
        // валидация входных параметров
        if(typeof(candy) !== 'number' || typeof(pineapple) !== 'number' || typeof(apple) !== 'number' || typeof(totalWeight) !== 'number') return 'Values must be numbers';
        if(!Number.isInteger(candy) || !Number.isInteger(pineapple) || !Number.isInteger(apple) || !Number.isInteger(totalWeight)) return 'Values must be integer';
        if(candy <= 0 || pineapple <= 0 || apple <= 0 || totalWeight <= 0) return 'Values must be greater than zero';

        // определение входных параметров по возрастанию
        const maxWeight = Math.max(candy, pineapple, apple);
        const minWeight = Math.min(candy, pineapple, apple);
        const midWeight = (candy + pineapple + apple) - maxWeight - minWeight;

        let result = 0;

        // подбирает значения начиная с самого маленького, и добавляет 1 к result если сумма равна totalWeight
        for(let x = 0; x <= (totalWeight / maxWeight); x++) {
            for(let y = 0; y <= ((totalWeight - x * maxWeight) / midWeight); y++) {
                for(let z = 0; z <= ((totalWeight - x * maxWeight - y * midWeight) / minWeight); z++) {
                    if(x * maxWeight + y * midWeight + z * minWeight === totalWeight) result++;
                }
            }
        }
        return result;
    }

    secretaryJimny(copies, firstXerox, secondXerox) {
        // валидация входных параметров
        if(typeof(copies) !== 'number' || typeof(firstXerox) !== 'number' || typeof(secondXerox) !== 'number') return 'Values must be numbers';
        if(!Number.isInteger(copies) || !Number.isInteger(firstXerox) || !Number.isInteger(secondXerox)) return 'Values must be integer';
        if(copies <= 0 || firstXerox <= 0 || secondXerox <= 0) return 'Values must be greater than zero';

        // определение быстрого и медленного ксерокса
        const fastestXerox = Math.min(firstXerox, secondXerox);
        const slowestXerox = Math.max(firstXerox, secondXerox);

        // общая производительность за 1 секунду и количество секунд нужных для получения всех копий (береться на 1 копию меньше потому что ее делает только быстрый ксерокс)
        const performance = (1 / fastestXerox + 1 / slowestXerox).toFixed(10);
        const seconds = ((copies - 1) / performance).toFixed(10);
        
        // округление по модулю для общих случаев и разница для определения времени простоя медленного принтера
        const moduleRound = Math.ceil(seconds / fastestXerox) * fastestXerox;
        const difference = (moduleRound - seconds) / (1 / performance);

        // если медленный принтер простаивает больше коэффициента 1 то это вносит коррекцию в результат
        if(difference > 1) return ((moduleRound / slowestXerox)^0) * slowestXerox + fastestXerox;

        // возвращение seconds по модулю (потому что общая производительность дает максимально возможную скорость, но Джимни не может печатать пол листка в одном ксероксе а остальное в другом) + время на первую копию
        return moduleRound + fastestXerox;
    }

    quantiCodersEmployees(budget) {
        // валидация входных параметров
        if(typeof(budget) !== 'number') return 'Values must be numbers';
        if(budget <= 0) return 'Values must be greater than zero';

        const drinks = {};
        const added = {};
        let currentSum = 0;
        const result = [];

        // получаем общую цену исходя из стоимости всех ингредиентов входного параметра
        const getPrice = (drink) => {
            let result = 0;
            for(let key in this.json.recipes[drink]) {
                result += this.json.prices[key] * this.json.recipes[drink][key];
            }
            // округляем до 4 знаком после точки, решает проблему двоичного кода с неточностью вычислений (IEEE 754)
            return result.toFixed(4);
        }

        for(let i = 0; i < this.json.employees.length; i++) {
            for(let key of this.json.employees[i].drinks) {
                if(drinks[key]) continue;
                drinks[key] = getPrice(key);
            }
        }

        // сортируем значения объекта начиная с маленького
        const minPrice = Object.values(drinks).sort((a, b) => a - b);

        // производим поиск по employees, начиная с самых дешевых напитков, и заканчиваем когда бюджет пуст
        for(let i = 0; i < minPrice.length;) {
            for(let key in drinks) {
                if(drinks[key] == minPrice[i]) {
                    employees: for(let k = 0; k < this.json.employees.length; k++) {
                        for(let item of this.json.employees[k].drinks) {
                            if(item == key) {
                                // проверка на повторение сотрудников так как у некоторых по два любимых напитка(выбираем самый дешевый из его любимых напитков)
                                if(added[this.json.employees[k].id]) continue employees;
                                if((currentSum + Number(drinks[key])) <= budget) {
                                    result.push({id: this.json.employees[k].id, name: this.json.employees[k].name, drink: key});
                                    added[this.json.employees[k].id] = true;
                                    currentSum = currentSum + Number(drinks[key]);
                                    break;
                                } else return result.sort((a, b) => a.id - b.id);
                            }
                        }
                    }
                }
            }
            minPrice.shift();
        }

        // возвращает отсортированый массив объектов с максимально возможным количеством приглашенных сотрудников
        return result.sort((a, b) => a.id - b.id);
    }
}

export default quantiCodersPlugin;