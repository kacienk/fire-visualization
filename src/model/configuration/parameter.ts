interface StringParameter {
  type: 'text';
  name: string;
  value: string;
}

interface NumberParameter {
  type: 'number';
  name: string;
  value: number;
}

interface EnumParameter<Enum extends string = ''> {
  type: 'enum';
  name: string;
  allVariants: readonly Enum[];
  value: Enum;
}

interface ArrayOfParameters {
  type: 'array';
  name: string;
  parameters: Parameter[];
}

interface ObjectParameter<T> {
  type: 'object';
  name: string;
  value: T;
}

type EnumParameters = EnumParameter<FireBrigadeState> | EnumParameter<ForesterPatrolState>;

type Parameter = StringParameter | NumberParameter | EnumParameters | ArrayOfParameters;

export const parameters: Record<keyof Configuration, Parameter> = {
  forestId: {
    type: 'number',
    name: 'Forest Id',
    value: 0,
  },
  forestName: {
    type: 'text',
    name: 'Las',
    value: 'Wolski',
  },
  states: {
    type: 'enum',
    name: 'state',
    value: 'AVAILABLE',
    allVariants: FireBrigadeStates,
  },
};
