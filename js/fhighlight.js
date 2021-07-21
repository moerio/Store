function code_highlight_style() {
    function gen_top_bar(i) {
        var attributes = {
            'autocomplete': 'off',
            'autocorrect': 'off',
            'autocapitalize': 'off',
            'spellcheck': 'false',
            'contenteditable': 'false',
            'design': '梨花镇的阿肾'
        }
        var ele_name = $('pre:eq(' + i + ')')[0].children[0].className;
        var lang = ele_name.substr(0, ele_name.indexOf(" ")).replace('language-', '');
        if (lang.toLowerCase() == "hljs") var lang = "text";
        $('pre:eq(' + i + ')').addClass('highlight-wrap');
        for (var t in attributes) {
            $('pre:eq(' + i + ')').attr(t, attributes[t]);
        }
        $('pre:eq(' + i + ') code').attr('data-rel', lang.toUpperCase());
    }
    $('pre code').each(function (i, block) {
        hljs.highlightBlock(block);
    });
    for (var i = 0; i < $('pre').length; i++) {
        gen_top_bar(i);
    }
    hljs.initLineNumbersOnLoad();
    $('pre').on('click', function (e) {
        if (e.target !== this) return;
        $(this).toggleClass('code-block-fullscreen');
        $('html').toggleClass('code-block-fullscreen-html-scroll');
    });
}
try {
    code_highlight_style();
} catch (e) {}
function copy_code_block() {
    $('pre code').each(function (i, block) {
        $(block).attr({
            id: 'hljs-' + i
        });
        $(this).after('<a class="copy-code" href="javascript:" data-clipboard-target="#hljs-' + i + '" title="拷贝代码"><i class="fa fa-clipboard" aria-hidden="true"></i></a>');
    });
    var clipboard = new ClipboardJS('.copy-code');
}

    $(document).ready(function () {
        code_highlight_style();
        copy_code_block();
    });