
import dynamic from 'next/dynamic';
import React from 'react'
const FilerobotImageEditor = dynamic(() => import('react-filerobot-image-editor'), {ssr: false});


function NewEditor({path}) {
  
  return (
    <div style={{width:600 ,  borderRadius:20, overflow:'hidden' ,
    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    height:600
    
    }}>
        <FilerobotImageEditor
          source={path}
          
          onSave={(editedImageObject, designState) =>
            console.log('saved', editedImageObject, designState)
          }
          
          

          annotationsCommon={{
            fill: '#ff0000',
          
          }}
          Text={{ text: 'I ❤️ WishGenie' }}
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
          observePluginContainerSize={false}
         // or {['Adjust', 'Annotate', 'Watermark']}
          defaultTabId={TABS.ANNOTATE} // or 'Annotate'
          defaultToolId={TOOLS.TEXT} // or 'Text'
        />
    </div>
  )
}

export default NewEditor