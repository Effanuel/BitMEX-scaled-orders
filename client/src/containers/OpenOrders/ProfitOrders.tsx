import React from 'react';
import {
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverArrow,
  Progress,
} from '@chakra-ui/react';
import {Order, SIDE, SYMBOL} from 'redux/api/bitmex/types';
import {presentOrderType} from 'presenters/order-presenters';
import {presentOrderPrice} from './OpenOrdersContainer';
import {useModal} from 'general/hooks';
import {OPEN_ORDERS_CONTAINER} from 'data-test-ids';
import {Button} from 'components';
import styles from './styles.module.scss';

interface OpenDialogProps {
  orderID: string;
  price: number;
  quantity: number;
  side: SIDE;
  symbol: SYMBOL;
}

interface Props {
  orderID: string;
  orders: Order[];
  quantityToCover: number;
}

export default function ProfitOrders({orderID, orders, quantityToCover}: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const {modals} = useModal();

  const showCancelProfitOrderModal = React.useCallback(
    (modalProps: OpenDialogProps) => () => modals.showCancelProfitOrder(modalProps),
    [modals],
  );

  const showCancelAllProfitOrdersModal = React.useCallback(() => {
    modals.showCancelAllProfitOrders({
      totalOrders: orders.length,
      profitOrderIds: orders.map(({orderID}) => orderID),
    });
  }, [modals, orders]);

  const showAddProfitTargetModal = React.useCallback(() => modals.showAddProfitTarget({orderID}), [modals, orderID]);

  const toCover = React.useMemo(() => {
    const totalProfitOrdersQuantity = orders.reduce((total, {orderQty}) => total + orderQty, 0);
    return (totalProfitOrdersQuantity / quantityToCover) * 100;
  }, [orders, quantityToCover]);

  const showPopover = React.useCallback(() => setOpen(true), []);
  const closePopover = React.useCallback(() => setOpen(false), []);

  // TODO move styles to index.ts theme
  return (
    <Popover
      isLazy
      returnFocusOnClose={false}
      isOpen={open}
      placement="bottom-end"
      onClose={closePopover}
      onOpen={showPopover}
    >
      <PopoverTrigger>
        <Box data-testid={OPEN_ORDERS_CONTAINER.SHOW_PROFIT_ORDERS}>
          {toCover}%
          <Progress colorScheme="green" hasStripe value={toCover} min={0} max={100} />
        </Box>
      </PopoverTrigger>
      <PopoverContent
        borderWidth={1}
        borderColor="green"
        maxWidth={720}
        display="flex"
        backgroundColor="#121212"
        paddingBottom={1}
      >
        <PopoverHeader fontWeight="semibold">
          <Box>Profit targets</Box>
        </PopoverHeader>
        <PopoverArrow />
        <Table>
          <Thead>
            <Tr>
              <Th>Symbol</Th>
              <Th>Type</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>Price</Th>
              <Th>Date</Th>
              <Th
                data-testid={OPEN_ORDERS_CONTAINER.CANCEL_ALL_PROFIT}
                bg="#424242"
                textStyle="hover:red:border"
                onClick={showCancelAllProfitOrdersModal}
              >
                Cancel All
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.map((order) => {
              const {orderQty, side, price, symbol, orderID, timestamp} = order;
              const color = side === 'Sell' ? 'red' : 'green';

              return (
                <Tr key={orderID} borderLeftWidth={2} borderLeftColor={color}>
                  <Td>{symbol}</Td>
                  <Td whiteSpace="pre" color={color}>
                    {presentOrderType(order)}
                  </Td>
                  <Td isNumeric>{orderQty}</Td>
                  <Td isNumeric>{presentOrderPrice(order)}</Td>
                  <Td whiteSpace="pre">{new Date(timestamp).toISOString().split('T')[0]}</Td>
                  <Td
                    data-testid={OPEN_ORDERS_CONTAINER.CANCEL_PROFIT}
                    whiteSpace="pre"
                    color="red"
                    textStyle="hover:red:color"
                    onClick={showCancelProfitOrderModal({orderID, side, symbol, quantity: orderQty, price})}
                  >
                    CANCEL
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <div className={styles.addButton}>
          <Button
            testID={OPEN_ORDERS_CONTAINER.ADD_PROFIT}
            variant="text"
            label="+Add"
            onClick={showAddProfitTargetModal}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
