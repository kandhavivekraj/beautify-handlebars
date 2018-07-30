'use babel';

import BeautifyHandlebars from '../lib/beautify-handlebars';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('BeautifyHandlebars', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('beautify-handlebars');
    editor = atom.workspace.buildTextEditor();
    editor.languageMode.grammar.id = 'text.html.mustache';
    editor.setText('<div class="foo bar" data-attr="attribute-1">{{#if cond2}}<button class="btn btn-xs btn-primary text-uppercase" {{action action1}}>ButtonText</button>{{/if}}{{#if cond3}}<button class="btn btn-xs btn-link text-uppercase {{someClass}}"{{action action2}}>ButtonText</button>{{/if}}</div>');
    editor.saveAs(`${__dirname}/summa.hbs`);
    spyOn(atom.workspace, 'getActiveTextEditor').andReturn(editor);
  });

  describe('when the beautify-handlebars:beautify event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'beautify-handlebars:beautify');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        let editor = atom.workspace.getActiveTextEditor();
        let text = editor.getText();
        let formattedText = `
<div class="foo bar" data-attr="attribute-1">
  {{#if cond2}}
    <button class="btn btn-xs btn-primary text-uppercase" {{action action1}}>
      ButtonText
    </button>
  {{/if}}
  {{#if cond3}}
    <button
      class="btn btn-xs btn-link text-uppercase {{someClass}}"
      {{action action2}}
    >
      ButtonText
    </button>
  {{/if}}
</div>`;
        expect(text.trim()).toBe(formattedText.trim());
      });
    });
  });
});
