import { m1logo, m2logo, m3logo, m4logo, m5logo, m6logo, m7logo, m8logo, m9logo, m10logo, m11logo, m12logo, m13logo, m14logo, m15logo, m16logo, m17logo, m18logo, w1logo, w2logo, w3logo, w4logo, w5logo, w6logo, w7logo, w8logo, w9logo, w10logo, w11logo, w12logo } from '@/assets/workers/workerImports'



const men = [ m1logo, m2logo, m3logo, m4logo, m5logo, m6logo, m7logo, m8logo, m9logo, m10logo, m11logo, m12logo, m13logo, m14logo, m15logo, m16logo, m17logo, m18logo]

const women = [ w1logo, w2logo, w3logo, w4logo, w5logo, w6logo, w7logo, w8logo, w9logo, w10logo, w11logo, w12logo]


export function chooseWorkerLogo(sex){
    let randMen = Math.floor(Math.random()*men.length)
    let randWomen = Math.floor(Math.random()*women.length)
    if (sex == 'M'){
        return men[randMen]
    }else{
        return women[randWomen]
    }

}