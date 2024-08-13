import { MergeView } from "@codemirror/merge";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";

/**
 * diff views
 */
export default class DiffView {
  view: MergeView;
  constructor(nv: string, ov: string, el: HTMLElement) {
    this.view = new MergeView({
      a: {
        doc: nv,
        extensions: [
          basicSetup,
          EditorView.editable.of(false),
          EditorState.readOnly.of(true),
        ],
      },
      b: {
        doc: ov,
        extensions: [
          basicSetup,
          EditorView.editable.of(false),
          EditorState.readOnly.of(true),
        ],
      },
      parent: el,
    });
  }
}
