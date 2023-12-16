import { FormControl, HStack, Icon, IconButton, Input, InputGroup } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { HiOutlineSearch } from 'react-icons/hi';




const SearchForm = ({ setSearch, setQueryReset }) => {
  const { register, handleSubmit } = useForm({});

  const submitHandler = (data) => {
    data.query ? setSearch(data.query) : setQueryReset(true);
  };

  return (
    <form style={{ width: '100%' }} onSubmit={handleSubmit(submitHandler)}>
      <FormControl>
        <HStack>
          <InputGroup>
            <Input
              id="query"
              type="search"
              variant="filled"
              focusBorderColor="blue.500"
              placeholder="Search photos"
              {...register('query')}
            />
          </InputGroup>
          <IconButton type="submit" aria-label="search-btn" icon={<Icon as={HiOutlineSearch} boxSize={5} />} />
        </HStack>
      </FormControl>
    </form>
  );
};

export default SearchForm;
