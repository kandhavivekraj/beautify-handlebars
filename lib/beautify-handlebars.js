'use babel';

import BeautifyHandlebarsView from './beautify-handlebars-view';
import { CompositeDisposable } from 'atom';
const prettier = require('prettier');
export default {
  beautifyHandlebarsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.beautifyHandlebarsView = new BeautifyHandlebarsView(
      state.beautifyHandlebarsViewState
    );

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(
      // eslint-disable-next-line no-undef
      atom.commands.add('atom-workspace', {
        'beautify-handlebars:beautify': () => this.beautify()
      })
    );
  },

  deactivate() {
    this.subscriptions.dispose();
    this.beautifyHandlebarsView.destroy();
  },

  serialize() {
    return {
      beautifyHandlebarsViewState: this.beautifyHandlebarsView.serialize()
    };
  },

  beautify() {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor && editor.languageMode.grammar.id === 'text.html.mustache') {
      let selectedText = editor.getSelectedText();
      let formatted = '';
      const options = {
        parser: 'glimmer',
        printWidth: atom.config.get('editor.preferredLineLength'),
        useTabs: atom.config.get('editor.tabType') === 'hard' ? true : false
      };
      try {
        if (selectedText) {
          formatted = prettier.format(selectedText, options);
          editor.insertText(formatted);
        } else {
          let text = editor.getText();
          formatted = prettier.format(text, options);
          editor.setText(formatted);
        }
        editor.save();
      } catch (err) {
        let message = err.toString();
        let details = '';
        if(message.includes('Closing tag')) {
          details = 'Seems like you have misplaced tags';
        } else if(message.includes('Parse error') && selectedText) {
          details = 'Seems like problem with your selected text, try again with different selection';
        } else {
          details = 'Seems like you have missed something.';
        }
        atom.notifications.addError('Ohhoooo :(', {
          detail: details
        });
        // eslint-disable-next-line no-console
        console.error(err);
      }
    }
  }
};
