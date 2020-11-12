import { Grid,Backdrop,CircularProgress } from '@material-ui/core';
import React,{useEffect,useState} from 'react';
import PlaceItem from './PlaceItem'
import { useHttpClient } from '../shared/hooks/http-hook';

import DEMO1 from '../testImage/DEMO1.jpeg';
import DEMO2 from '../testImage/DEMO2.png';
import DEMO3 from '../testImage/DEMO3.jpeg';
import DEMO4 from '../testImage/DEMO4.jpeg';
import DEMO5 from '../testImage/DEMO5.jpeg';
import DEMO6 from '../testImage/DEMO6.jpeg';
import DEMO7 from '../testImage/DEMO7.jpg';
import DEMO9 from '../testImage/DEMO9.jpg';
import DEMO10 from '../testImage/DEMO10.jpg';
import DEMO11 from '../testImage/DEMO11.jpg';
import DEMO12 from '../testImage/DEMO12.jpg';
import DEMO13 from '../testImage/DEMO13.jpg';
import DEMO14 from '../testImage/DEMO14.jpg';

const dummyPlaces=[
    {
        title:'台北火車站',
        subtitle: '旅行起點',
        creator:'John',
        createdAt:'2020/11/10',
        description:'可以搭乘公車、捷運、火車的好地點，做為起點再好不過。',
        imageUrl:DEMO2
    },{
        title:'九份',
        subtitle: '近郊獨特氛圍',
        creator:'John',
        createdAt:'2020/11/10',
        description:'可以享受到美食美景以及日式特別氛圍的好地方。',
        imageUrl:DEMO3
    },{
        title:'水湳洞',
        subtitle: '陰陽海',
        creator:'John',
        createdAt:'2020/11/10',
        description:'往山面看有綿延山脈的13層遺跡，往海上看，可以一覽陰陽海。',
        imageUrl:DEMO4
    },{
        title:'忘憂谷',
        subtitle: '私房點',
        creator:'John',
        createdAt:'2020/11/10',
        description:'山谷的地形形成大隱於市中的秘境，可以一覽太平洋與峭壁的美景。',
        imageUrl:DEMO5
    },{
        title:'基隆夜市',
        subtitle: '吃',
        creator:'John',
        createdAt:'2020/11/10',
        description:'吃天一香滷肉飯，營養三明治去瑞芳吃就好。',
        imageUrl:DEMO6
    },{
        title:'饒河街夜市',
        subtitle: '台北最強夜市',
        creator:'Peter',
        createdAt:'2020/11/10',
        description:'恩，其實我也沒去過。',
        imageUrl:DEMO9
    },{
        title:'中正紀念堂',
        subtitle: '',
        creator:'Kevin',
        createdAt:'2020/11/10',
        description:'海外觀光客必去勝地。',
        imageUrl:DEMO10
    },{
        title:'故宮博物院',
        subtitle: '計程車很坑',
        creator:'Peter',
        createdAt:'2020/11/10',
        description:'豐富的古物、便捷的交通，可以作為一天早上景點，傍晚可以延伸向上去淡水的看日落',
        imageUrl:DEMO11
    },{
        title:'淡水老街',
        subtitle: '魚酥與阿給',
        creator:'John',
        createdAt:'2020/11/10',
        description:'適合買買紀念零食，吃吃美食的地方',
        imageUrl:DEMO12
    },{
        title:'漁人馬頭',
        subtitle: '日落',
        creator:'Kevin',
        createdAt:'2020/11/10',
        description:'可以看到美麗日落的不錯地方。',
        imageUrl:DEMO13
    }
]

const Places=(props)=>{
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [places, setPlaces] = useState(dummyPlaces);

    return (
        <Grid container >
        <Backdrop  open={isLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        {!isLoading && places.length!==0&&
            places.map((place,i)=>{
            
                return(
                    <Grid item key={i} md={4} xs={12}>
                       <PlaceItem content={place}/>
                    </Grid>
                );
            })
        }
        </Grid>
    );
}

export default Places;