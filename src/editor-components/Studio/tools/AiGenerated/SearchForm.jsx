import { Button, FormControl, HStack, Icon, IconButton, Input, InputGroup, Textarea, VStack } from '@chakra-ui/react';
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
        <VStack>
          <InputGroup>
            <Textarea
              id="query"
              fontSize={'xs'}
              fontWeight={'light'}
              borderWidth={'1px'}
              placeholder="Description for the image to be generate...  "
              {...register('query')}
            />
          </InputGroup>
          <Button  type="submit"  w='100%' py={6} fontWeight={'normal'} >
             Generate Image
          </Button>
          {/* <IconButton  width='100%' aria-label="search-btn" icon={<Icon as={HiOutlineSearch} boxSize={5} />} > 
          </ */}
        </VStack>
      </FormControl>
    </form>
  );
};

export default SearchForm;
