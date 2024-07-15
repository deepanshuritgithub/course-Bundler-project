import { Grid, Box, Heading, Text, VStack } from '@chakra-ui/react'
import React, {useState} from 'react'
import introVideo from '../../../public/assets/videos/video.mp4'


function CoursePage() {

    // const lectureTitle ="LectureTitle";
    // const lectureNumber = 0;

    const [lectureNumber, setLectureNumber ] = useState(0);

    const lectures = [
        //item1 , index 0 hoga eska
        {
        //so jesa backend se data milegaa usi type ka model bna rha hu basically mai 
        _id:"cdfwfwwfefcdcfe1",
        title:"sample1",
        description: "sample dnshui deudheue djijdiw ",
        video:{
            //esme 2 chize hongi publicid or url
            url:'sadsad',
        },
    },

    //item 2 , eske index 1 hogaa 
        {
        //so jesa backend se data milegaa usi type ka model bna rha hu basically mai 
        _id:"cdfwfwwfefcdcfe2",
        title:"sample2",
        description: "sample dnshui deudheue djijdiw ",
        video:{
            //esme 2 chize hongi publicid or url
            url:'sadsad',
        },
    },

        //item 3 , eske index 2 hogaa 
        {
        //so jesa backend se data milegaa usi type ka model bna rha hu basically mai 
        _id:"cdfwfwwfefcdcfe3",
        title:"sample3",
        description: "sample dnshui deudheue djijdiw ",
        video:{
            //esme 2 chize hongi publicid or url
            url:'sadsad',
        },
    },

]






  return (
    <Grid minH={"97vh"} templateColumns={["1fr", "3fr 1fr"]}> 
                                    {/* //esme phla jo col hogaa vo 3 fractional part lega col ka and bacha hua hai jo vo 1 part legaa agror bhi add krna chaho to kr sakte ho vo ek series mai align ho jayegaa space deke likhna padegaa bss   */}


        <Box>
                
            <video
                //   loop 
                mutedVideo
                width={"100%"}
                controls
                src={introVideo}
                controlsList="nodownload noremoteplayback"
                disablePictureInPicture
                disableRemotePlayback
            > 
            </video> 
                                    {/* //+1 kyuki lecture Number jo hogaa index based hoga 0 bases hogaa 0, 1, 2 es type se  , so jo array hogi hmari lectures ki usme jo phle item hogaa 0's pe , so mai nahi chahta vo 0 lecture dikahye so start hi 1 se kr rha hai basically */}
            <Heading m={"4"} children={`#${lectureNumber + 1} ${lectures[lectureNumber].title}`} />
      

            <Heading m={"4"} children="Description" />
            <Text m="4" children={lectures[lectureNumber].description} />
                                    {/* /lecture number starting mai 0 hogaa   */}


        </Box>

        {/* //so 2 col hai grid mai basically  */}

        
        <VStack>
            {/* //esme kuch nahi bs jo lectutes ki jo array hai uspe map krengee  */}
            {
            lectures.map((item, index) =>(
                //ye button html wala hai na ki chakra ui, chakra ui mai kya hota hai ki default styling aati hai vo nahi chahiyee 
                <button
                    //ab hame key pass krne hoti hai button mai , button mai nhi jo bhi map mai use kr rha hai usme

                    onClick={() => setLectureNumber(index)}
                    key={item._id}
                    style={{
                        width: '100%', 
                        padding: '1rem', 
                        textAlign: 'center', 
                        margin : 0, 
                        borderBottom:'1px solid rgba(0,0,0,0.2)',
                    }}

                > 
                        {/* //wrapper tag  use  for readability */}
                        <Text noOfLines={1}> 
                            #{index+1} {item.title} 
                            {/* //so 0th index hogi to phli video dikhayega ye , index ka hmara pass directly access hota hai , or ye 0 se hi start hota hai  */}
                        </Text>
                </button>
            ))
            }
        </VStack>

    </Grid>
)
}

export default CoursePage



//now ab hmme backed se api bnake integrate krne padegii or ye jo lectures ka temporary array hai eski jagah pe asli array chiyegii 