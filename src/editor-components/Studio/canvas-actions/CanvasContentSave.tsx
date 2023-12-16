import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import DrawerWrapper from '@/editor-components/components/Drawer/DrawerWrapper';
import { useAppSelector } from '@/editor-components/hooks/use-app-selector';
import CanvasCreateForm from './CanvasCreateForm';
import useStageObject from '@/editor-components/hooks/use-stage-object';
import { useEffect, useState } from 'react';
import { useUpdateCanvasMutation } from '@/store/api/canvas-slice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import Konva from 'konva';
import { blob } from 'stream/consumers';
import { error } from 'console';
import Loader from '@/editor-components/components/Loader/Loader';
import { uploadedImages } from '@/store/slices/editor/order-slice';
import { UPLOAD_PRODCUT_ART } from '@/api/Api';

type IProps = {
  stageRef: React.RefObject<Konva.Stage> | null;
};

const CanvasContentSave = ({ stageRef }: IProps) => {
  const { stageObjects } = useStageObject();

  const [content, setContent] = useState('[]');
  const { stage } = useAppSelector((state) => state.frame);
  const {selectedType} = useSelector(state => state.template)

  const [update, { isLoading }] = useUpdateCanvasMutation();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { width, height } = useAppSelector((state) => state.frame);
  const dispatch = useDispatch()

  useEffect(() => {
    const objectsJSON = JSON.stringify(stageObjects);
    setContent(objectsJSON);
  }, [stageObjects]);

  const [isloading , setLoading] = useState(false)


  // const saveHandler = () => {
  //   if (!stage.id) {
  //     toast({
  //       title: 'Please create new stage first.',
  //       status: 'info',
  //       duration: 5000,
  //       isClosable: true,
  //     });

  //     onOpen();
  //     return;
  //   }

  //   const stageValues = {
  //     id: stage.id as string,
  //     name: stage.name as string,
  //     description: stage.description as string,
  //   };



  //   // update({ ...stageValues, content })
  //   //   .then(() => {
  //   //     toast({
  //   //       title: 'Changes were successfully saved.',
  //   //       status: 'success',
  //   //       duration: 5000,
  //   //       isClosable: true,
  //   //     });
  //   //   })
  //   //   .catch((err) => console.error(err));
  // }



  const saveHandler = async () => {
    if (stageRef?.current) {
      try {
        setLoading(true)
        const dataURL = stageRef.current.toDataURL({
          x: 0,
          y: 0,
          width: 1038/5,
          height: 1383/5,
          pixelRatio: 2 / stageRef.current.attrs.scaleX 
        })
        
        const file = await convertDataURLToBlob(dataURL)
       
        if(file){
          const { data } = await axios.post(UPLOAD_PRODCUT_ART, { image: file }, {
            headers: {
              'Content-Type': 'multipart/form-data', // Important: Set the content type to 'multipart/form-data'
            }
          })
          console.log(data)
          const files = sessionStorage.getItem('files');
          if(files) {
              let Files = JSON.parse(files)
              let UpdatedFile : {type:string , url:string} =   Files.find((blob:{type:string , url:string}) => blob.type === selectedType)
              if(UpdatedFile){
                UpdatedFile[url] = data?.url
                Files = [...Files , UpdatedFile]
              }
              else{
                Files = [...Files , {type:selectedType , url:data?.image_url}]
              }
             
              sessionStorage.setItem('files' , JSON.stringify(Files))
          }
          else{
             let Files = [{type:selectedType , url:data}]
             sessionStorage.setItem('files' , JSON.stringify(Files))
          }
        
          dispatch(uploadedImages({type:selectedType , url:data}))
          
        }
        setLoading(false)
      } 
      catch (error) {
        console.log(error)
        setLoading(false)
      }

    }
  };

  function generateRandomString(length:number) {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset.charAt(randomIndex);
    }
  
    return result;
  }

  

  async function convertDataURLToBlob(dataURL :string) {
    try {
      const response = await fetch(dataURL);
      const blob = await response.blob();
      const fileName = generateRandomString(10);
      const file = new File([blob],`${fileName}.png`, { type: blob.type });

      console.log(file);
      return file;
    } catch (error) {
      console.error(error);
      return null; // Handle the error appropriately in your code
    }
  }




  return (
    <>
      <Button isLoading={isLoading} onClick={saveHandler} bgColor={'blue.400'} textColor={'white'} fontSize={12} padding={3} paddingY={2} shadow={'xl'}>
       { isloading && <Loader />}
        Save Changes
      </Button>
      <DrawerWrapper title="Create a stage" isOpen={isOpen} onClose={onClose}>
        <CanvasCreateForm content={content} />
      </DrawerWrapper>
    </>
  );
};

export default CanvasContentSave;
