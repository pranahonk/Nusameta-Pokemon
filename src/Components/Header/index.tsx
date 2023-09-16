import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";

const Header = () => {
  return (
    <Box
      as="header"
      bg="white"
      h="70px"
      display="grid"
      p="1rem"
      w="100%"
      alignItems="center"
      gridTemplateColumns="1fr 1fr"
    >
      <Box display="flex" justifyContent="center" alignItems="center" fontSize="1.2rem" gap="0.5rem">
        <Text fontWeight="bold">Nusameta Pokemon</Text>
      </Box>

      <Box justifySelf="flex-end" display="flex" gap="1.2rem">
        <Link href="/" passHref className="font-bold text-[#999999] border-slate-200 bg-transparent">
          Home
        </Link>

        <Link href="/favorites" passHref className="font-bold text-[#999999] border-slate-200 bg-transparent">
          Favorite
        </Link>

        <Link href="/recommendation" passHref className="font-bold text-[#999999] border-slate-200 bg-transparent">
          Recommendation
        </Link>
      </Box>
    </Box>
  );
};

export default Header;
