import { expect, assert } from "chai";
import { compile } from "pug";
import { Block } from "./Block";
import { CommonProps } from "./models/props";

describe("Block:", () => {
  let isRendered = false;
  let isRenderAfterUpdate = false;

  class TestComponent extends Block<CommonProps> {
    constructor(props: any) {
      super("div", props);
    }

    componentDidUpdate(oldProps: CommonProps, newProps: CommonProps): boolean {
      if (oldProps != newProps) isRenderAfterUpdate = true;
      return true;
    }

    renderPug() {
      const template = `a(class="general-link" href=href) #{text}`;
      compile(template)(this.props);
      isRendered = true;
    }
  }

  const testComponent = new TestComponent({
    text: "text",
  });

  it("Ready for render", () => {
    assert.isNotNull(testComponent.getContent());
  });

  it("Render", () => {
    testComponent.renderPug();
    assert.isNotNull(isRendered);
  });

  it("Set props", () => {
    testComponent.setProps({
      text: "New value",
    });
    expect(testComponent.props.text).to.eq("New value");
  });

  it("Render after setting props", () => {
    expect(isRenderAfterUpdate).to.eq(true);
  });
});
