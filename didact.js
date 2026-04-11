function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map(child =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  }
}

function render(element, container) {
  const dom =
    element.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)

  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      dom[name] = element.props[name]
    })

  element.props.children.forEach(child => render(child, dom))

  container.appendChild(dom)
}

const Didact = {
  createElement,
  render,
}

const element = Didact.createElement(
  "div",
  { id: "container-principal", style: "font-family: sans-serif; padding: 20px;" },
  Didact.createElement("h1", null, "Didact Funcionando!"),
  Didact.createElement("p", null, "A Missão 1 foi renderizada com sucesso.")
)

const container = document.getElementById("root")
Didact.render(element, container)