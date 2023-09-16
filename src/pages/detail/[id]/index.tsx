import {Box, Button, Card, CardBody, Divider, Heading, Image, Text} from "@chakra-ui/react";
import {useAppDispatch} from "../../../store/store";
import {PokemonData} from "../../../types/book";
import {pokemonApiDetail} from "../../../services/BookApi";
import {useRouter} from "next/router";
import {addFavorite} from "../../../store/Favorites.store";

const PageDetail = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const id = router?.query?.id;


    const { data: pokemonDetail, refetch, isLoading, isFetching, error, status }  = pokemonApiDetail({id});

    return (
        <>
            <div className="grid place-items-center h-screen">
                <Card maxW='md'>
                    <CardBody>
                        <Box display="flex" justifyContent="center">
                            <Image
                                height="420"
                                width="280"
                                src={pokemonDetail?.data?.sprites?.front_default}
                                alt={pokemonDetail?.data?.sprites?.front_default}
                            />
                        </Box>

                        <Box
                            display="grid"
                            gap="1rem"
                            css={{
                                p: {
                                    fontWeight: "bold",
                                    color: "#999999",
                                },
                                h3: {
                                    fontWeight: "bold",
                                },
                            }}
                        >
                            <Heading textAlign="center">{pokemonDetail?.data?.name}</Heading>

                            <Box>
                                <Text as="h3">Name:</Text>
                                <Text as="p">{pokemonDetail?.data?.name}</Text>
                            </Box>

                            <Box>
                                <Text as="h3">Weight:</Text>
                                <Text as="p">{pokemonDetail?.data?.weight}</Text>
                            </Box>
                            <Box>
                                <Text as="h3">Height:</Text>
                                <Text as="p">{pokemonDetail?.data?.height}</Text>
                            </Box>
                            <Box>
                                <Text as="h3">base experience: </Text>
                                <Text as="p">{pokemonDetail?.data?.base_experience}</Text>
                            </Box>

                            <Box
                                css={{
                                    display: "-webkit-box",
                                    "-webkit-line-clamp": "5",
                                    "-webkit-box-orient": "vertical",
                                    overflow: "hidden",
                                }}
                            >
                            </Box>
                        </Box>
                        <Button
                            position="absolute"
                            top="7%"
                            right="20%"
                            p="8px"
                            _hover={{
                                background: "none",
                            }}
                            borderRadius="40%"
                            onClick={() => dispatch(addFavorite(pokemonDetail.data as PokemonData))}
                        >
                            <Image
                                width="25"
                                height="25"
                                src="/svg/heart-full.svg"
                                alt="favorito"
                            />
                        </Button>
                    </CardBody>
                    <Divider />
                </Card>
            </div>
        </>
    );
};

export default PageDetail;
