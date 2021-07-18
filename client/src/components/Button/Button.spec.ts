import {Button, ButtonVariants} from './Button';
import {classNameOf} from 'tests/wrench/inspectors';
import {SIDE} from 'redux/api/bitmex/types';
import {createComponentRenderer} from 'tests/influnt';

const props = {
  id: 'default:id',
  label: 'default:label',
  testID: 'default:testID',
  variant: 'submit' as ButtonVariants,
  disabled: false,
  onClick: jest.fn(),
  style: undefined,
  className: 'ClassName',
};

const render = createComponentRenderer(Button, {passProps: props});

describe('ButtonDriver', () => {
  it.each([
    ['submit', 'button'],
    ['text', 'text_button'],
    [SIDE.BUY, 'button_buy'],
    [SIDE.SELL, 'button_sell'],
    ['textSell', 'text_sell'],
  ])('should return %s className for %s variant', async (variant, expectedClassName) => {
    const result = await render({passProps: {variant: variant as ButtonVariants}}).inspect({
      className: classNameOf('default:testID'),
    });

    expect(result).toEqual({className: expectedClassName});
  });

  it('should use `className` prop for `custom` variant button', async () => {
    const result = await render({passProps: {variant: 'custom'}}) //
      .inspect({className: classNameOf('default:testID')});

    expect(result).toEqual({className: 'ClassName'});
  });
});
