document.addEventListener("DOMContentLoaded", function () {


    function addClass(el, class_name) {
        el.classList.add(class_name);
    }
    function removeClass(el, class_name) {
        el.classList.remove(class_name);
    }
    function toggleClass(el, class_name) {
        el.classList.toggle(class_name);
    }

    // function handleClosePopup(popup) {
    //     removeClass(overlay, 'open');
    //     removeClass(popup, 'open');
    // }

    // function handleOpenPopup(popup) {
    //     addClass(overlay, 'open');
    //     addClass(popup, 'open');
    // }

    // function handleTogglePopup(popup) {
    //     toggleClass(overlay, 'open');
    //     toggleClass(popup, 'open');
    // }

    // function handleCloseCityPopup(popup) {
    //     removeClass(overlay_2, 'open');
    //     removeClass(popup, 'open');
    // }

    // function handleOpenCityPopup(popup) {
    //     addClass(overlay_2, 'open');
    //     addClass(popup, 'open');
    // }

    const header = document.querySelector('header');
    const headerOverlay = header.querySelector('.header_overlay');

    if (document.querySelector('.btn-menu')) { // Клик по кнопке для открытия меню и клик по header_overlay
        const btnMenuToggle = document.querySelectorAll('.btn-menu');

        btnMenuToggle.forEach(element => {
            element.addEventListener('click', () => {
                toggleClass(header, "open");
            })
        });

        if (headerOverlay) {
            headerOverlay.addEventListener('click', () => {
                removeClass(header, "open");
            })
        }
    }

    if (document.querySelector('header .menu li.drop')) {
        const dropsMenu = document.querySelectorAll('header .menu li.drop');

        dropsMenu.forEach(drop => {
            drop.addEventListener('click', (e) => {
                if (window.screen.width < 1281) {
                    e.preventDefault();
                    toggleClass(drop, 'open');
                }
            })
        });
    }

    if (document.querySelector('header .search')) {
        const headerSearchBtnOpen = header.querySelector('.header_search_svg_btn');
        const searchCont = header.querySelector('.search');
        const headerSearchBtnClose = searchCont.querySelector(".close_svg");
        const headerSearchInput = searchCont.querySelector("input");

        headerSearchBtnOpen.addEventListener('click', () => {
            addClass(header, "search");
            headerSearchInput.focus();
        })
        headerSearchBtnClose.addEventListener('click', () => {
            removeClass(header, "search");
        })

        document.addEventListener('click', (event) => {
            if (!event.target.classList.contains('header_search_svg_btn')) {
                const isClickInside = searchCont.contains(event.target); // Проверяем, был ли клик внутри .search

                if (!isClickInside && header.classList.contains("search")) {
                    removeClass(header, "search");
                }
            }
        });
    }

    if (document.querySelector('.sort_btn')) {
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('sort_btn') || event.target.closest('.sort_btn')) {
                toggleClass(document.querySelector('.sort_btn'), "open");
            } else if (!event.target.closest('.sort_btn')) {
                removeClass(document.querySelector('.sort_btn'), "open");
            }
        });
    }

    if (document.querySelector('[data-href]')) {
        const hrefElems = document.querySelectorAll('[data-href]');
        hrefElems.forEach(el => {
            el.addEventListener('click', () => {
                window.location.href = el.getAttribute('data-href');
            })
        });
    }



    if (document.querySelector('.config_choice_section')) {
        // Обработчик кликов на кнопках фильтров

        const config_choice_section = document.querySelector('.config_choice_section');

        const customSelects = config_choice_section.querySelectorAll('.filters .custom-select');

        customSelects.forEach(customSelect => {
            customSelect.addEventListener('click', () => {
                if (customSelect.classList.contains('active')) {
                    removeClass(customSelect, 'active');
                } else {
                    customSelects.forEach(el => {
                        removeClass(el, "active");
                    })

                    addClass(customSelect, 'active');
                }

            })
        });

        // document.querySelectorAll('.filters .custom-select').forEach(select => {
        //     select.addEventListener('click', function (e) {

        //         document.querySelectorAll('.filters .custom-select').forEach(el => {
        //             el.classList.remove('active');
        //         })

        //         if (e.target.tagName.toLowerCase() !== 'button') {
        //             this.classList.add('active');
        //         }
        //     });
        // });

        document.querySelectorAll('.filters .options button').forEach(button => {
            button.addEventListener('click', function () {
                const filter = this.getAttribute('data-filter');
                const value = this.getAttribute('data-value');

                // Обновляем текст выбранного значения
                const selectedSpan = this.closest('.custom-select').querySelector('.selected');
                selectedSpan.textContent = this.textContent;

                // Скрываем список опций
                // button.closest('.custom-select').classList.remove('active');

                // Сохраняем выбранное значение в localStorage и в URL
                localStorage.setItem(filter, value);
                updateUrlParams(filter, value);

                // Обновляем превью модели
                updateModelPreview();
            });
        });

        // Инициализация превью при загрузке страницы
        updateModelPreview();

        // Функция для обновления URL с параметрами фильтров
        function updateUrlParams(filter, value) {
            const urlParams = new URLSearchParams(window.location.search);

            // Устанавливаем или удаляем параметр в URL
            if (value) {
                urlParams.set(filter, value);
            } else {
                urlParams.delete(filter);
            }

            // Обновляем URL без перезагрузки страницы
            history.replaceState({}, '', `?${urlParams.toString()}`);
        }

        // Функция для обновления превью модели
        function updateModelPreview() {
            // Получаем выбранные значения из URL и localStorage
            const urlParams = new URLSearchParams(window.location.search);
            const selectedModel = urlParams.get('model') || 'model0';
            const selectedTrailer = urlParams.get('trailer') || 'trailer0';
            const selectedEngine = urlParams.get('engine') || 'engine0';
            const topColor = urlParams.get('corpus-top-color') || 'black';
            const bottomColor = urlParams.get('corpus-bottom-color') || 'black';
            const seatColor = urlParams.get('seats-color') || 'black';
            const frameColor = urlParams.get('window-frames-color') || 'black';

            // Формируем имя файла изображения на основе выбранных параметров
            let imageName = `image_${selectedModel}_${selectedTrailer}_${selectedEngine}_top-${topColor}_bottom-${bottomColor}_seats-${seatColor}_frames-${frameColor}.jpg`;

            // Путь к изображению
            const imageUrl = `/img/${imageName}`;

            // Загружаем изображение в превью
            document.getElementById('model-preview').innerHTML = `<img data src="${imageUrl}" alt="Model Preview">`;
        }

        function getUrlParams() {
            const urlParams = new URLSearchParams(window.location.search);
            return {
                model: urlParams.get('model') || 'model0',
                trailer: urlParams.get('trailer') || 'trailer0',
                engine: urlParams.get('engine') || 'engine0',
                corpusTopColor: urlParams.get('corpus-top-color') || 'black',
                corpusBottomColor: urlParams.get('corpus-bottom-color') || 'black',
                seatsColor: urlParams.get('seats-color') || 'black',
                windowFramesColor: urlParams.get('window-frames-color') || 'black'
            };
        }

        const params = getUrlParams();

        if (params.model != 'model0') {
            // Устанавливаем значения в фильтрах на основе GET-параметров
            document.querySelector(`[data-filter="model"][data-value="${params.model}"]`).click();

            if (params.trailer != 'trailer0') {
                // Устанавливаем значения в фильтрах на основе GET-параметров
                document.querySelector(`[data-filter="trailer"][data-value="${params.trailer}"]`).click();
            }
            if (params.engine != 'engine0') {
                // Устанавливаем значения в фильтрах на основе GET-параметров
                document.querySelector(`[data-filter="engine"][data-value="${params.engine}"]`).click();
            }

            document.querySelector(`[data-filter="corpus-top-color"][data-value="${params.corpusTopColor}"]`).click();
            document.querySelector(`[data-filter="corpus-bottom-color"][data-value="${params.corpusBottomColor}"]`).click();
            document.querySelector(`[data-filter="seats-color"][data-value="${params.seatsColor}"]`).click();
            document.querySelector(`[data-filter="window-frames-color"][data-value="${params.windowFramesColor}"]`).click();
        }




        document.addEventListener('click', (event) => {
            if (!event.target.closest('.filter_check')) {
                customSelects.forEach(customSelect => {
                    removeClass(customSelect, 'active');
                });
            }
        });

        customSelects.forEach(customSelect => {
            removeClass(customSelect, 'active');
        });

    }

    if (document.querySelector('.swiperElement .swiper-slide.video')) {
        const swiperElement = document.querySelector('.swiperElement')
        const swiperSlides = swiperElement.querySelectorAll(".swiper-slide");
        const d_btn = swiperElement.querySelector(".d_btn");
        const zoom = swiperElement.querySelector(".zoom");


        // Создаем новый экземпляр MutationObserver
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (mutation.target.classList.contains('video')) {
                        if (mutation.target.classList.contains('swiper-slide-active')) {
                            addClass(d_btn, "no_v");
                            addClass(zoom, "no_v");
                        } else {
                            removeClass(d_btn, "no_v");
                            removeClass(zoom, "no_v");
                        }
                    }
                }
            }
        });

        // Конфигурация наблюдателя: наблюдать за изменением атрибутов
        const config = { attributes: true };

        swiperSlides.forEach(slide => {
            observer.observe(slide, config);
        });

        zoom.addEventListener('click', () => {
            swiperSlides.forEach(slide => {
                if (slide.classList.contains("swiper-slide-active")) {
                    slide.click();
                }
            });
        })
    }

    if (document.querySelector('#links_id a')) {
        const links_id = document.getElementById('links_id');
        const links = links_id.querySelectorAll('a');
        let num = 0;
        links.forEach(link => {
            if (num == 0) {
                addClass(link, "active");
            }

            link.addEventListener('click', () => {
                links.forEach(el => {
                    removeClass(el, "active");
                })
                addClass(link, "active");
            })

            num++;
        });
    }

    if (document.querySelector('[data-max-card]')) {
        const cardsSections = document.querySelectorAll('[data-max-card]');

        cardsSections.forEach(section => {
            let maxCardNum = section.getAttribute('data-max-card');
            let moreCardsBtn = section.querySelector('#btn_more');
            let num = 0;

            section.querySelectorAll('.card').forEach(card => {
                if (num >= maxCardNum) {
                    addClass(card, 'invise');
                }
                num++;
            });

            if (!section.querySelector('.card.invise')) {
                addClass(moreCardsBtn, 'invise');
            }

            moreCardsBtn.addEventListener('click', () => {
                let num = 0;
                section.querySelectorAll('.card.invise').forEach(card => {
                    if (num <= 2) {
                        removeClass(card, 'invise');
                    }
                    num++;
                });
                if (!section.querySelector('.card.invise')) {
                    addClass(moreCardsBtn, 'invise');
                }
            })

        });
    }

    if (document.querySelector('.popupCheck')) {
        var overlay = document.querySelector('.overlay');
        var popupCheck = document.querySelector('.popupCheck')
        var popupCheckCloseBtn = popupCheck.querySelector('.close-btn');

        popupCheckCloseBtn.addEventListener('click', () => {
            removeClass(overlay, 'open');
            removeClass(popupCheck, 'open');
        })
        overlay.addEventListener('click', () => {
            document.querySelectorAll('.open').forEach(el => {
                removeClass(el, 'open');
            })
        })
    }

    if (document.querySelector('form')) {
        const formSect = document.querySelectorAll("form");
        const titlePopupCheck = popupCheck.querySelector('h2');
        formSect.forEach(formSect => {

            if (!formSect.classList.contains('search_form')) {

                let formBtn = formSect.querySelector("[type='submit']");
                let nameInp = formSect.querySelector("[name='name']");
                let phoneInp = formSect.querySelector("[name='phone']");
                let checkBox = formSect.querySelector('.checkBox');

                if (checkBox) {
                    checkBox.addEventListener('click', () => {
                        toggleClass(checkBox, "checked");

                        if (formSect.classList.contains('sub')) {
                            if (nameInp) {
                                checkInputsValid(nameInp, 1);
                            }

                            checkInputsValid(phoneInp, 17);
                        }

                    })
                }

                window.addEventListener("DOMContentLoaded", function () {
                    [].forEach.call(document.querySelectorAll("[name='phone']"), function (input) {
                        var keyCode;
                        function mask(event) {
                            event.keyCode && (keyCode = event.keyCode);
                            var pos = this.selectionStart;
                            if (pos < 3) event.preventDefault();
                            var matrix = "+7 (___) ___ ____",
                                i = 0,
                                def = matrix.replace(/\D/g, ""),
                                val = this.value.replace(/\D/g, ""),
                                new_value = matrix.replace(/[_\d]/g, function (a) {
                                    return i < val.length ? val.charAt(i++) : a
                                });
                            i = new_value.indexOf("_");
                            if (i != -1) {
                                i < 5 && (i = 3);
                                new_value = new_value.slice(0, i)
                            }
                            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                                function (a) {
                                    return "\\d{1," + a.length + "}"
                                }).replace(/[+()]/g, "\\$&");
                            reg = new RegExp("^" + reg + "$");
                            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                                this.value = new_value;
                            }
                            if (event.type == "blur" && this.value.length < 5) {
                                this.value = "";
                            }
                        }

                        input.addEventListener("input", mask, false);
                        input.addEventListener("focus", mask, false);
                        input.addEventListener("blur", mask, false);
                        input.addEventListener("keydown", mask, false);

                    });
                });

                if (nameInp) {
                    $(function () {
                        $(nameInp).keyup(function () {
                            sergey = $(this).val().toLowerCase(), spout = 'http://,https,url,.ru,.com,.net,.tk,php,.ucoz,www,.ua,.tv,.info,.org,.su,.ру,.су,.ком,.инфо,//'.split(',');
                            for (litvinov = 0; litvinov < spout.length; litvinov++) {
                                if (sergey.search(spout[litvinov]) != -1) {
                                    $(this).val(sergey.replace(spout[litvinov], '[Запрещено]'));
                                    return true;
                                }
                            }
                        });
                    });
                }

                function checkInputsValid(input, num) {
                    if (checkBox) {
                        if (input.value.length < num) {
                            input.parentNode.classList.add("err");
                            formBtn.disabled = true;
                            return false;
                        } else {
                            input.parentNode.classList.remove("err");
                            if (checkBox.classList.contains("checked")) {
                                formBtn.disabled = false;
                                return true;
                            } else {
                                formBtn.disabled = true;
                                return false;
                            }
                        }
                    } else {
                        if (input.value.length < num) {
                            input.parentNode.classList.add("err");
                            formBtn.disabled = true;
                            return false;
                        } else {
                            input.parentNode.classList.remove("err");

                            return true;
                        }
                    }
                }

                let check;

                function addLisInput(input, num) {
                    checkInputsValid(input, num);
                    input.addEventListener('input', check = () => {
                        checkInputsValid(input, num);
                        if (nameInp) {
                            if (checkInputsValid(nameInp, 1) && checkInputsValid(phoneInp, 17)) {
                                formBtn.disabled = false;
                            } else {
                                formBtn.disabled = true;
                            }
                        } else {
                            if (checkInputsValid(phoneInp, 17)) {
                                formBtn.disabled = false;
                            } else {
                                formBtn.disabled = true;
                            }
                        }
                    })
                }

                function removeLisInput(input) {
                    input.removeEventListener('input', check)
                }

                function clearInputs(input) {
                    input.value = '';
                    if (checkBox) {
                        removeClass(checkBox, "checked");
                    }
                }

                function handleTextGood() {
                    titlePopupCheck.textContent = 'Спасибо за заявку! Скоро с вами свяжется наш консультант!';
                    removeClass(formSect, 'open');
                    addClass(overlay, 'open')
                    addClass(popupCheck, 'open')
                    if (nameInp) {
                        clearInputs(nameInp);
                    }
                    clearInputs(phoneInp);
                    setTimeout(() => {
                        document.querySelectorAll('.open').forEach(el => {
                            removeClass(el, 'open');
                        })
                    }, 3500);
                }

                function handleTextNoGood() {
                    titlePopupCheck.textContent = 'Повторите попытку позже';
                    removeClass(formSect, 'open');
                    addClass(popupCheck, 'open');
                    setTimeout(() => {
                        if (overlay.classList.contains('open')) {
                            addClass(formSect, 'open');
                        }
                    }, 3500);
                }

                function handleTextError() {
                    titlePopupCheck.textContent = 'Что-то пошло не так';
                    removeClass(formSect, 'open');
                    addClass(popupCheck, 'open');
                    setTimeout(() => {
                        if (overlay.classList.contains('open')) {
                            addClass(formSect, 'open');
                        }
                    }, 3500);
                }

                formSect.addEventListener('submit', (e) => {
                    e.preventDefault();

                    addClass(formSect, "sub");

                    if (nameInp) {
                        removeLisInput(nameInp);
                    }

                    removeLisInput(phoneInp);

                    if (nameInp) {
                        addLisInput(nameInp, 1);
                    }

                    addLisInput(phoneInp, 17);
                    if (nameInp) {
                        if (checkInputsValid(nameInp, 1) && checkInputsValid(phoneInp, 17)) {
                            // grecaptcha.ready(function () {
                            //     grecaptcha.execute('6Lfk9qspAAAAALXnyJqhAd6kX-ZFapXhfIN0DmQ-', { action: 'submit' }).then(function (token) {
                            //         let formData = new FormData();
                            //         formData.append('name', nameInp.value);
                            //         formData.append('phone', phoneInp.value);
                            //         formData.append('token', token);
                            //         fetch('/local/templates/main/tools/send.php', {
                            //             method: 'POST',
                            //             body: formData,
                            //         })
                            //             .then((res) => {
                            //                 return res.json();
                            //             })
                            //             .then(result => {
                            //                 if (result > 0.5) {
                            //                     handleTextGood();
                            //                 } else {
                            //                     handleTextNoGood();
                            //                 }
                            //             })
                            //             .catch((err) => {
                            //                 handleTextError();
                            //                 console.log(err);
                            //             })
                            //     });
                            // });
                            handleTextGood();
                        }
                    } else {
                        if (checkInputsValid(phoneInp, 17)) {
                            // grecaptcha.ready(function () {
                            //     grecaptcha.execute('6Lfk9qspAAAAALXnyJqhAd6kX-ZFapXhfIN0DmQ-', { action: 'submit' }).then(function (token) {
                            //         let formData = new FormData();
                            //         formData.append('name', nameInp.value);
                            //         formData.append('phone', phoneInp.value);
                            //         formData.append('token', token);
                            //         fetch('/local/templates/main/tools/send.php', {
                            //             method: 'POST',
                            //             body: formData,
                            //         })
                            //             .then((res) => {
                            //                 return res.json();
                            //             })
                            //             .then(result => {
                            //                 if (result > 0.5) {
                            //                     handleTextGood();
                            //                 } else {
                            //                     handleTextNoGood();
                            //                 }
                            //             })
                            //             .catch((err) => {
                            //                 handleTextError();
                            //                 console.log(err);
                            //             })
                            //     });
                            // });
                            handleTextGood();
                        }
                    }
                })

            }


        });
    }

    if (document.querySelector('.model_menu_and_filter .input_lines .line_inp')) {

        const model_menu_and_filter = document.querySelector('.model_menu_and_filter');

        if (model_menu_and_filter.querySelector('.mob_close_filt')) {
            model_menu_and_filter.querySelector('.mob_close_filt').addEventListener('click', () => {
                removeClass(model_menu_and_filter, "open");
            })
        }

        if (document.querySelector('.filter_btn')) {
            document.querySelector('.filter_btn').addEventListener('click', () => {
                addClass(model_menu_and_filter, "open");
            })
        }
        if (document.getElementById('filter_sub')) {
            document.getElementById('filter_sub').addEventListener('click', () => {
                removeClass(model_menu_and_filter, "open");
            })
        }

        if (model_menu_and_filter.querySelector('.filter-group')) {
            const filterGroups = model_menu_and_filter.querySelectorAll('.filter-group');

            filterGroups.forEach(group => {
                let selected = group.querySelector('.selected');
                let options = group.querySelectorAll('.sel_list');

                selected.addEventListener('click', () => {
                    toggleClass(group, "open");
                })

                document.addEventListener('click', (event) => {
                    if (!event.target.closest('.filter-group')) {
                        removeClass(group, "open");
                    }
                });

                options.forEach(btn => {
                    btn.addEventListener('click', () => {
                        selected.textContent = btn.textContent.trim();
                        removeClass(group, "open");
                    })
                });
            });
        }

        if (model_menu_and_filter.querySelector('.color_cont')) {
            const colorsCont = model_menu_and_filter.querySelector('.colors');
            const colors = colorsCont.querySelectorAll('div');

            colors.forEach(element => {
                element.addEventListener('click', () => {
                    colors.forEach(el => {
                        removeClass(el, "active");
                    })
                    addClass(element, "active");
                })
            });
        }

        // Функция для форматирования значений с префиксом
        function formatValue(value, prefix) {
            return `${prefix} ${value}`;
        }

        // Функция для очистки значения от префиксов
        function clearPrefix(value) {
            return value.replace(/[^0-9.]/g, ''); // Убираем всё, кроме цифр и точки
        }

        // Функция для ограничения значения в заданном диапазоне
        function clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }

        // Функция для создания слайдера
        function createSlider(sliderId, minInputId, maxInputId) {
            const slider = document.getElementById(sliderId);
            const minInput = document.getElementById(minInputId);
            const maxInput = document.getElementById(maxInputId);

            // Получаем минимальное и максимальное значения из атрибутов data-min и data-max
            const minRange = parseFloat(minInput.getAttribute('data-min'));
            const maxRange = parseFloat(maxInput.getAttribute('data-max'));

            // Создаем слайдер с использованием noUiSlider
            noUiSlider.create(slider, {
                start: [minRange, maxRange],
                connect: true,
                range: {
                    'min': minRange,
                    'max': maxRange
                }
            });

            // Обновление значений инпутов при изменении слайдера
            slider.noUiSlider.on('update', (values) => {
                minInput.value = formatValue(Math.round(values[0]), 'от');
                maxInput.value = formatValue(Math.round(values[1]), 'до');
            });

            // Обработка фокуса, потери фокуса и клавиш для инпутов
            [minInput, maxInput].forEach(input => {
                input.addEventListener('focus', function () {
                    this.value = clearPrefix(this.value); // Очищаем значение от префикса
                    this.select(); // Выделяем весь текст в инпуте
                });

                input.addEventListener('blur', function () {
                    const value = clearPrefix(this.value); // Очищаем значение от префикса
                    if (value !== '') {
                        const numericValue = parseFloat(value);
                        const isMin = this === minInput;
                        const clampedValue = clamp(numericValue, minRange, maxRange); // Ограничиваем значение

                        // Обновляем слайдер и форматируем значение
                        slider.noUiSlider.set(isMin ? [clampedValue, null] : [null, clampedValue]);
                        this.value = formatValue(clampedValue, isMin ? 'от' : 'до');
                    } else {
                        const currentValue = slider.noUiSlider.get()[this === minInput ? 0 : 1];
                        this.value = formatValue(currentValue, this === minInput ? 'от' : 'до');
                    }
                });

                input.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter') {
                        this.blur(); // Убираем фокус при нажатии Enter
                    }
                });
            });
        }

        // Создание слайдеров для всех параметров
        createSlider('weight-slider', 'weight-min', 'weight-max'); // Грузоподъемность
        createSlider('length-slider', 'length-min', 'length-max'); // Длина
        createSlider('width-slider', 'width-min', 'width-max'); // Ширина
    }

    if (document.querySelector('.just_text')) {
        const just_text = document.querySelector('.just_text');
        let more_text_btn = just_text.querySelector('.more_text_btn');

        more_text_btn.addEventListener('click', () => {
            addClass(just_text, "open");
        })
    }

    if (document.querySelector('#map')) {
        ymaps.ready(init);

        function init() {
            // Создаем SVG-иконку
            var svgIcon = `<svg width="63" height="73" viewBox="0 0 63 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_148_4119)">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M42.9067 61.0879C54.6653 56.5018 63 45.0338 63 31.6121C63 14.1532 48.897 0 31.5 0C14.103 0 0 14.1532 0 31.6121C0 45.0338 8.33469 56.5018 20.0932 61.0879L20.0256 61.1583L31.5 73.1041L42.9744 61.1583L42.9067 61.0879Z" fill="#0E7490"/>
                        <path d="M29.9234 37.4281L25.0898 48H46.1588L47.4117 45.2595L50.9923 37.4281H29.9234Z" fill="white"/>
                        <path d="M32.4291 31.9491L32.4285 31.951L41.3256 31.9491L37.745 24.1177L36.4921 21.3773H31.2182L31.3938 20.993L33.8551 15.6103L33.8545 15.609L30.8325 9L27.8106 15.609L25.3493 20.9918L25.173 21.3773H15.5059L20.3394 31.9491L13 48H19.0451L26.3839 31.9491H32.4291Z" fill="white"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_148_4119">
                            <rect width="63" height="73" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>`;

            // Создаем карту
            var myMap = new ymaps.Map("map", {
                center: [61.265136, 73.439125], // Москва
                zoom: 10,
                controls: []
            }, {
                // Устанавливаем черно-белую палитру
                geoObjectOpenBalloonIconLayout: "default#image",
                suppressMapOpenBlock: true
            });

            // Добавляем палитру для черно-белого отображения
            myMap.options.set('background', '#ffffff');
            myMap.options.set('suppressObsoleteBrowserNotification', true);
            myMap.panes.get('ground').getElement().style.filter = 'grayscale(100%)';

            // Создаем метку с SVG-иконкой
            var myPlacemark = new ymaps.Placemark([61.265136, 73.439125], {}, {
                iconLayout: 'default#image',
                iconImageHref: 'data:image/svg+xml;base64,' + btoa(svgIcon),
                iconImageSize: [63, 73],
                iconImageOffset: [-31.5, -73]
            });

            // Добавляем метку на карту
            myMap.geoObjects.add(myPlacemark);
        }
    }

    console.log('index.js finish work');
});