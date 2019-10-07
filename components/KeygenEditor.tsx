import React, { FunctionComponent, useState, useRef } from "react";
import Plain from "slate-plain-serializer";
import { KeyUtils } from "slate";
import { Editor, EditorProps } from "slate-react";
import { isKeyHotkey } from "is-hotkey";
import * as _ from "lodash";

import { Button, Icon, Toolbar } from "./EditorToolBtn";

interface Props extends Omit<EditorProps, "value"> {
  uniqueId?: string;
  content?: string;
}

const DEFAULT_NODE = "paragraph";

const isBoldHotkey = isKeyHotkey("mod+b");
const isItalicHotkey = isKeyHotkey("mod+i");
const isUnderlinedHotkey = isKeyHotkey("mod+u");
const isCodeHotkey = isKeyHotkey("mod+`");

const getType = (chars: string) => {
  switch (chars) {
    case "*":
    case "-":
    case "+":
      return "list-item";
    case ">":
      return "block-quote";
    case "#":
      return "heading-one";
    case "##":
      return "heading-two";
    case "###":
      return "heading-three";
    case "####":
      return "heading-four";
    case "#####":
      return "heading-five";
    case "######":
      return "heading-six";
    default:
      return null;
  }
};
let key = 0;

const KeygenEditor: FunctionComponent<Props> = function({
  uniqueId = "default",
  content = "",
  ...props
}) {
  const keygen = () => {
    key += 1;
    return uniqueId + key; // custom keys
  };
  KeyUtils.setGenerator(keygen);
  const initialValue = Plain.deserialize(content);
  const [value, setValue] = useState(initialValue);
  const editor = useRef<Editor>(null);

  const hasMark = (type?: string) => {
    return value.activeMarks.some(mark => (mark && mark.type) === type);
  };

  const hasBlock = (type?: string) => {
    return value.blocks.some(node => (node && node.type) === type);
  };
  const onClickMark = (event: Event, type: string) => {
    event.preventDefault();
    editor.current && editor.current.toggleMark(type);
  };

  const onClickBlock = (event: any, type: any) => {
    event.preventDefault();
    if (!editor.current) {
      return;
    }
    const { value } = editor.current;
    const { document } = value;

    // Handle everything but list buttons.
    if (type !== "bulleted-list" && type !== "numbered-list") {
      const isActive = hasBlock(type);
      const isList = hasBlock("list-item");
      if (isList) {
        editor.current
          .setBlocks(isActive ? DEFAULT_NODE : type)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else {
        editor.current.setBlocks(isActive ? DEFAULT_NODE : type);
      }
    } else {
      // Handle the extra wrapping required for list buttons.
      const isList = hasBlock("list-item");
      const isType = value.blocks.some(block => {
        return !!(
          block &&
          document.getClosest(
            block.key,
            parent => _.get(parent, "type") === type
          )
        );
      });

      if (isList && isType) {
        editor.current
          .setBlocks(DEFAULT_NODE)
          .unwrapBlock("bulleted-list")
          .unwrapBlock("numbered-list");
      } else if (isList) {
        editor.current
          .unwrapBlock(
            type === "bulleted-list" ? "numbered-list" : "bulleted-list"
          )
          .wrapBlock(type);
      } else {
        editor.current.setBlocks("list-item").wrapBlock(type);
      }
    }
  };
  const renderMarkButton = (type: string, icon: string) => {
    const isActive = hasMark(type);

    return (
      <Button
        active={isActive}
        onMouseDown={(event: Event) => onClickMark(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  };
  const renderBlockButton = (type: string, icon: any) => {
    let isActive = hasBlock(type);

    if (["numbered-list", "bulleted-list"].includes(type)) {
      const { document, blocks } = value;

      if (document && blocks && blocks.size > 0) {
        const parent = document.getParent(blocks.first().key);
        if (parent && parent.object !== "text") {
          isActive = hasBlock("list-item") && parent && parent.type === type;
        }
      }
    }

    return (
      <Button
        active={isActive}
        onMouseDown={(event: any) => onClickBlock(event, type)}
      >
        <Icon>{icon}</Icon>
      </Button>
    );
  };
  console.info("value", value);

  return (
    <div>
      <Toolbar>
        {renderMarkButton("bold", "format_bold")}
        {renderMarkButton("italic", "format_italic")}
        {renderMarkButton("underlined", "format_underlined")}
        {renderMarkButton("code", "code")}
        {renderBlockButton("heading-one", "looks_one")}
        {renderBlockButton("heading-two", "looks_two")}
        {renderBlockButton("block-quote", "format_quote")}
        {renderBlockButton("numbered-list", "format_list_numbered")}
        {renderBlockButton("bulleted-list", "format_list_bulleted")}
      </Toolbar>
      <Editor
        spellCheck
        autoFocus
        ref={editor}
        placeholder="Write some markdown..."
        // defaultValue={initialValue}
        onKeyDown={onKeyDown}
        renderBlock={renderBlock}
        renderMark={renderMark}
        value={value}
        onChange={({ value }: any = {}) => {
          value && setValue(value);
        }}
        {...props}
      />
    </div>
  );
};

export default KeygenEditor;

const renderBlock = (props: any, editor: any, next: any) => {
  const { attributes, children, node } = props;

  switch (node.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    case "heading-four":
      return <h4 {...attributes}>{children}</h4>;
    case "heading-five":
      return <h5 {...attributes}>{children}</h5>;
    case "heading-six":
      return <h6 {...attributes}>{children}</h6>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    default:
      return next();
  }
};

const renderMark = (
  props: { children: any; mark: any; attributes: any },
  editor: any,
  next: () => void
) => {
  const { children, mark, attributes } = props;

  switch (mark.type) {
    case "bold":
      return <strong {...attributes}>{children}</strong>;
    case "code":
      return <code {...attributes}>{children}</code>;
    case "italic":
      return <em {...attributes}>{children}</em>;
    case "underlined":
      return <u {...attributes}>{children}</u>;
    default:
      return next();
  }
};

const onKeyDown = (event: any, editor: any, next: any) => {
  let mark;

  if (isBoldHotkey(event)) {
    mark = "bold";
  } else if (isItalicHotkey(event)) {
    mark = "italic";
  } else if (isUnderlinedHotkey(event)) {
    mark = "underlined";
  } else if (isCodeHotkey(event)) {
    mark = "code";
  } else {
    switch (event.key) {
      case " ":
        return onSpace(event, editor, next);
      case "Backspace":
        return onBackspace(event, editor, next);
      case "Enter":
        return onEnter(event, editor, next);
      default:
        return next();
    }
  }

  event.preventDefault();
  editor.toggleMark(mark);
};

const onSpace = (event: any, editor: any, next: any) => {
  const { value } = editor;
  const { selection } = value;
  if (selection.isExpanded) return next();

  const { startBlock } = value;
  const { start } = selection;
  const chars = startBlock.text.slice(0, start.offset).replace(/\s*/g, "");
  const type = getType(chars);
  if (!type) return next();
  if (type === "list-item" && startBlock.type === "list-item") return next();
  event.preventDefault();

  editor.setBlocks(type);

  if (type === "list-item") {
    editor.wrapBlock("bulleted-list");
  }

  editor.moveFocusToStartOfNode(startBlock).delete();
};
const onBackspace = (event: any, editor: any, next: any) => {
  const { value } = editor;
  const { selection } = value;
  if (selection.isExpanded) return next();
  if (selection.start.offset !== 0) return next();

  const { startBlock } = value;
  if (startBlock.type === "paragraph") return next();

  event.preventDefault();
  editor.setBlocks("paragraph");

  if (startBlock.type === "list-item") {
    editor.unwrapBlock("bulleted-list");
  }
};
const onEnter = (event: any, editor: any, next: any) => {
  const { value } = editor;
  const { selection } = value;
  const { start, end, isExpanded } = selection;
  if (isExpanded) return next();

  const { startBlock } = value;
  if (start.offset === 0 && startBlock.text.length === 0)
    return onBackspace(event, editor, next);
  if (end.offset !== startBlock.text.length) return next();

  if (
    startBlock.type !== "heading-one" &&
    startBlock.type !== "heading-two" &&
    startBlock.type !== "heading-three" &&
    startBlock.type !== "heading-four" &&
    startBlock.type !== "heading-five" &&
    startBlock.type !== "heading-six" &&
    startBlock.type !== "block-quote"
  ) {
    return next();
  }

  event.preventDefault();
  editor.splitBlock().setBlocks("paragraph");
};
