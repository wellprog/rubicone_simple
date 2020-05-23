(
    /**
     * 
     * @param {jQuery} $ 
     */
    function($){
        //Подключаем фильтры только на страницах с сайдбаром
        let sidebar = $(".rsidebar");
        if (sidebar.length == 0) return;

        //Создали шаблоны блока
        let template =  '<section class="sky-form">' +
                        '<h4>{NAME}</h4>' +
                        '<div class="row row1 scroll-pane">' +
                        '</div>' +
                        '</section>';
        //И строки
        let elementTemplate = '<label class="checkbox"><input type="checkbox" name="checkbox"><i></i>{NAME}</label>';

        //Нашли все товары на странице
        let allElements = $(".part-sec");

        //Создаем массив пропертей
        let allProps = [];

        //Пробегаемся по всем товарам и находим там data- атрибуты
        for (let i = 0; i < allElements.length; i++) {
            //получаем текущий элемент списка
            let current = allElements[i];

            //Получаем все data- атрибуты
            // и строим из них сл. структуру
            // BRAND
            //     Nvidia
            //     Amd
            // Price
            //     100
            //     200
            //     300
            // INSTOCK
            //     yes
            //     no            
            for (let prop in current.dataset) {
                if (allProps[prop] == undefined)
                    allProps[prop] = [];
                
                if (allProps[prop].indexOf(current.dataset[prop]) == -1) {
                    allProps[prop].push(current.dataset[prop]);
                }
            }
            
        }

        //Ок, мы получили все что нужно
        //Теперь давайте соберем HTML

        for (let category in allProps) {
            //Создаем контейнер
            let container = $(template);
            //Добавляем описание
            container.find("h4").html(category);

            for (let i = 0; i < allProps[category].length; i++) {
                //Создаем элемент
                let item = $(elementTemplate);
                //Добавляем ему имя
                item.html(allProps[category][i]);

                //Заливаем в контайнер
                container.find(".row").append(item);
            }

            sidebar.append(container);
        }
    }
)(jQuery);