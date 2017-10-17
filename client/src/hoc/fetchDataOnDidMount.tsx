import * as React from 'react';

export default function fetchDataOnDidMount(...fetchFuncs: Array<Function>) {
  function enhance(BaseComponent: React.ComponentType): React.ComponentClass {
    class EnhancedComponent extends React.Component<{}> {

      static displayName: string;
      componentDidMount() {
        fetchFuncs.map(func => func());
      }
      
      render() {
        const props = this.props;
        return <BaseComponent {...props} />;
      }
    }
    EnhancedComponent.displayName = `fetchDataOnDidMount(${getDisplayName(BaseComponent)})`;
    return EnhancedComponent;
  }

  function getDisplayName(WrappedComponent: React.ComponentType) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return enhance;
}