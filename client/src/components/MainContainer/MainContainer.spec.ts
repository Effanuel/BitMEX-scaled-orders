import {exists, textOf} from 'tests/wrench/inspectors';
import {MainContainer} from 'components';
import {createRenderer} from 'tests/wrench/Wrench';
import {MAIN_CONTAINER} from 'data-test-ids';
import React from 'react';

const render = createRenderer(MainContainer, {
  props: {label: 'LABEL', children: undefined, description: 'Description'},
});

describe('Main Container', () => {
  it('should render children by default', async () => {
    const result = await render().inspect({maxViewVisible: exists(MAIN_CONTAINER.CHILDREN_VIEW)});

    expect(result).toEqual({maxViewVisible: true});
  });

  it.skip('should toggle children rendering on toggle', async () => {
    const result = await render()
      .inspect({beforeMaxViewVisible: exists(MAIN_CONTAINER.CHILDREN_VIEW)})
      .press(MAIN_CONTAINER.CORNER_BUTTON)
      .inspect({afterMaxViewVisible: exists(MAIN_CONTAINER.CHILDREN_VIEW)});

    expect(result).toEqual({beforeMaxViewVisible: true, afterMaxViewVisible: false});
  });

  it('should render secondaryState instead of children, if it is defined', async () => {
    const secondaryState = React.createElement('div', {'data-testid': 'ID'}, 'SecondaryState');

    const result = await render({passProps: {secondaryState}}).inspect({secondaryState: textOf('ID')});

    expect(result).toEqual({secondaryState: 'SecondaryState'});
  });
});
