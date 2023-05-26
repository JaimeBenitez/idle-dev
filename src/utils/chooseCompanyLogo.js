import QuestionMark from '@/assets/question-mark.svg'
import CompanyLvl1 from '@/assets/company-level1.svg'
import CompanyLvl2 from '@/assets/company-level2.svg'
import CompanyLvl3 from '@/assets/company-level3.svg'
import CompanyLvl4 from '@/assets/company.svg'
import CompanyLvl5 from '@/assets/company-level5.svg'


export default function chooseCompanyLogo(level){


  const companiesLogos = {
    0: QuestionMark,
    1: CompanyLvl1,
    2: CompanyLvl2,
    3: CompanyLvl3,
    4: CompanyLvl4,
    5: CompanyLvl5
  }
    return companiesLogos[level]
  }