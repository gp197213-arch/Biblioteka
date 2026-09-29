# Clinetest1

This repository contains a simple website template.

## Конвертация HTML‑алманаха в PDF

Для генерации PDF, который полностью сохраняет стили, изображения и
кириллические шрифты, используйте скрипт **`convert_to_pdf.py`**.

### Требования
* **Python 3.8+** (для запуска скрипта).
* Один из двух бэкендов:
  * **WeasyPrint** – чисто‑Python библиотека.  Установить:
    ```bash
    pip install weasyprint
    ```
    (при необходимости также `cairo`, `pango`, `gdk-pixbuf` – `pip` обычно
    подтягивает их автоматически).
  * **wkhtmltopdf** – отдельный исполняемый файл.  Скачайте последнюю
    версию с https://github.com/wkhtmltopdf/packaging/releases, установите и
    убедитесь, что `wkhtmltopdf.exe` находится в переменной `PATH`.

### Как использовать
```bash
python convert_to_pdf.py test\index.html test\literary_almanac.pdf
```

Скрипт сначала пытается выполнить конвертацию через **WeasyPrint**; если
библиотека недоступна, автоматически переключается на **wkhtmltopdf**.  В
любом случае будет создан PDF‑файл, в котором кириллические символы отображаются
корректно, а стили (цвета, отступы, фон, таблицы, изображения) сохраняются.

### Примечание про шрифты
Чтобы гарантировать наличие шрифта, поддерживающего кириллицу, добавьте в
`test/index.html` следующий блок (или аналогичный, если используете другой
шрифт):

```html
<style>
@font-face {
    font-family: 'ArialUnicode';
    src: url('file:///C:/Windows/Fonts/arial.ttf') format('truetype');
}
body { font-family: 'ArialUnicode', sans-serif; }
</style>
```

Это позволяет как WeasyPrint, так и wkhtmltopdf корректно находить шрифт
в системе Windows.
