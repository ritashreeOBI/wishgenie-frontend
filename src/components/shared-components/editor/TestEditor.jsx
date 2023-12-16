import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useEffect } from 'react';
const FilerobotImageEditor = dynamic(() => import('react-filerobot-image-editor'), {ssr: false});


export const TestEditor = ({path })  => {

  

 

  return (
   
        <FilerobotImageEditor

          source={path}
          
          onSave={(editedImageObject, designState) =>
            console.log('saved', editedImageObject, designState)
          }
         
          annotationsCommon={{
            fill: '#ff0000',
          }}
          Text={{ text:  'I ❤️ WishGenie'  }}
          Rotate={{ angle: 90, componentType: 'slider' }}
          Crop={{
            presetsItems: [
              {
                titleKey: 'classicTv',
                descriptionKey: '4:3',
                ratio: 4 / 3,
                // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
              },
              {
                titleKey: 'cinemascope',
                descriptionKey: '21:9',
                ratio: 21 / 9,
                // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
              },
            ],
            presetsFolders: [
              {
                titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                groups: [
                  {
                    titleKey: 'facebook',
                    items: [
                      {
                        titleKey: 'profile',
                        width: 180,
                        height: 180,
                        descriptionKey: 'fbProfileSize',
                      },
                      {
                        titleKey: 'coverPhoto',
                        width: 820,
                        height: 312,
                        descriptionKey: 'fbCoverPhotoSize',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          // or 'Text'
        />
    
   
  );
}

