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

    console.log('index.js finish work');
});