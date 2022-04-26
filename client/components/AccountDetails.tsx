import { HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import Blockies from "react-blockies";

const AccountDetails: FC<{ account: string }> = ({ account }) => (
  <HStack>
    <Blockies seed={account} size={10} scale={3} />
    <Text fontWeight="bold" colorScheme="teal">
      {account.substring(0, 6)}...
      {account.substring(account.length - 4)}
    </Text>
  </HStack>
);

export default AccountDetails;
