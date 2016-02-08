(function poll() {
  if ( typeof ynabToolKit !== "undefined"  && ynabToolKit.pageReady === true ) {

    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: false,
      breaks: false,
      sanitize: true,
      smartLists: false,
      smartypants: false
    });

    ynabToolKit.richTextMemos = new function ()  {

      this.invoke = function() {
        $('.inspector-category-note').each(function() {

          var $this = $(this);

          // Ignore our own
          if ($this.hasClass('toolkit-category-note')) {
            continue;
          }

          // The editor ends up as a child within each inspector category note,
          // so if there are no children, then we're not in editing state.
          if (this.children.length == 0) {
            var newElement =
            '<p class="inspector-category-note user-data toolkit-category-note">' +
              marked($this.text().trim()) +
            '</p>';

            $this.append(newElement);
            $this.hide();
          }
        });
      },

      this.observe = function(changedNodes) {

        if ( changedNodes.has('inspector-category-note') || changedNodes.has('budget-inspector') ) {
          ynabToolKit.richTextMemos.invoke();
        }
      }
    };

    ynabToolKit.richTextMemos.invoke();

  } else {
    setTimeout(poll, 250);
  }
})();
