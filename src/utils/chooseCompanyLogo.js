import QuestionMark from '@/assets/question-mark.svg'
import CompanyLvl1 from '@/assets/company-level1.svg'
import CompanyLvl2 from '@/assets/company-level2.svg'
import CompanyLvl3 from '@/assets/company-level3.svg'
import CompanyLvl4 from '@/assets/company.svg'
import CompanyLvl5 from '@/assets/company-level5.svg'


export default function chooseCompanyLogo(level){
    switch(level) {
      case 0:
        return QuestionMark   
      case 1: 
        return CompanyLvl1
      case 2:
        return CompanyLvl2
      case 3: 
        return CompanyLvl3
      case 4: 
        return CompanyLvl4
      case 5:
        return CompanyLvl5
        
    }
  }