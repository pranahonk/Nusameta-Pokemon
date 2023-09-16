import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {SearchIcon} from '@chakra-ui/icons';
import {FormErrorMessage, InputGroup, InputRightElement} from '@chakra-ui/react';

const SearchInput = ({onChange }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
    } = useForm({
        mode: "onChange" // "onChange"
    });

    return (
      <>
          <FormErrorMessage>
              Minimum length should be 3
          </FormErrorMessage>
          <InputGroup display="flex">
              <InputRightElement
                  alignContent="center"
                  pointerEvents="none"
                  top="4px"
              >
                  <SearchIcon alignSelf="center" fontSize="22px" />
              </InputRightElement>
              <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: true }}
                  render= {() => (
                      <input
                          className={`w-full h-[50px] min-w-0 outline-none outline-offset-2 relative appearance-none 
                            transition-[background-color,border-color,color,fill,stroke,opacity,box-shadow,transform] 
                            duration-['200ms'] text-["1.125rem"] font-bold rounded-["0.375rem"] border-[3px] 
                            border-solid border-["#DADADA"] placeholder-black py-[4px] px-[10px]`}
                          placeholder="luo"
                          {...register('search', {
                              required: 'This is required',
                              minLength: { value: 3, message: 'Minimum length should be 3' },
                              maxLength: {value: 36, message: 'Maximum length should be not exceed 36' },
                              onChange: (e): void => {
                                  onChange(e)
                              }
                          })}
                      />
                  )}
              />
          </InputGroup>
          {errors.search?.type === "minLength" && (
              <p className="text-red-500">
                  Minimum length should be 3
              </p>
          )}
          {errors.search?.type === "required" && (
              <p className="text-red-500">
                  This is required
              </p>
          )}
          {errors.search?.type === "maxLength" && (
              <p className="text-red-500">
                  Maximum length should be not exceed 36
              </p>
          )}
      </>
  );
};

export default SearchInput;
