export type ParameterType = "text" | "boolean" | "number"

export interface Parameter {
  type: ParameterType
  name: string
  value: string
}

export const parameters: Parameter[] = [
  {
    type: "text",
    name: "Parameter 1",
    value: ""
  },
  {
    type: "number",
    name: "Parameter 2",
    value: "123.32"
  },
  {
    type: "text",
    name: "Parameter 3",
    value: "a value"
  },
  {
    type: "text",
    name: "Parameter 4",
    value: ""
  },
  {
    type: "boolean",
    name: "Parameter 5",
    value: "true"
  },
  {
    type: "number",
    name: "Parameter 6",
    value: ""
  },
]
