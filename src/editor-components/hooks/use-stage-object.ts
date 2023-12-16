import { nanoid } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { stageObjectSelector, stateObjectActions } from '@/store/slices/editor/stage-object-slice';
import { StageObject, StageObjectData, StageObjectPartial } from '@/editor-components/types/stage-object';
import { useAppSelector } from './use-app-selector';
import { toast } from 'react-toastify';

const useStageObject = () => {
  const dispatch = useDispatch();
  const stageObjects = useAppSelector(stageObjectSelector.selectAll);

  
  const createOne = (data: StageObjectData) => {
    
    let z_index = stageObjects.length > 0 ? stageObjects.length   : 0

    const payload: StageObject = { 
      id: nanoid(), 
      data: {
         ...data, 
         z_index ,
        updatedAt: Date.now() 
      }
     };
    dispatch(stateObjectActions.addOne(payload));
    toast.success('Item is added to the stage');
  };

  const updateOne = (obj: StageObjectPartial) => {
    const { id, data } = obj;
    if (!id || !data) {
      return;
    }

    const target = stageObjects.find((s) => s.id === id);
    if (!target) {
      throw new Error(`A target with the id ${id} does not exist.`);
    }

    const payload = { ...target.data, ...data };
    payload.image && delete payload.image;
    dispatch(stateObjectActions.updateOne({ id, data: payload }));
   
  };

  const updateMany = (obj:StageObjectPartial) => {
    console.log("use object hook" , obj)
     dispatch(stateObjectActions.updateMany(obj))
  }
  const removeOne = (id: string) => {
    toast.warn('Item removed from the stage',);
    dispatch(stateObjectActions.remove(id));
  };

  const resetAll = () => {
    dispatch(stateObjectActions.removeAll());
  };

  const replaceAll = (objects: StageObject[]) => {
    
    dispatch(stateObjectActions.replaceAll(objects));
  };

  return {
    stageObjects,
    createOne,
    updateOne,
    removeOne,
    resetAll,
    replaceAll,
    updateMany 
  };
};
export default useStageObject;
