require('dotenv').config();
const {CohereClientV2}=require('cohere-ai')

const dummyItem = {
    name: "Apple",
    category: "Fruits & Vegetables",
    expiryDate: "2025-01-20", // Set a future expiry date
    storageCondition: "Cool and dry place", // Optional field, can be set as 'Normal' if not available
  };
class MLService{
    constructor(){
        this.CohereClient=new CohereClientV2({
            token:process.env.COHERE_API_KEY
        })
        this.wastepredictor=null
        this.demandpredictor=null
    }

    async analyzeItem(item){
        try {
            const daysUntillExpiry=Math.ceil((new Date(item.expiryDate)-new Date()) / (1000*60*60*24))

            const riskAnalysis=await this._getRiskAnalysis(item,daysUntillExpiry)

            const categoryRisk=await this._getCategoryRisk(item.category)

            let riskScore=(riskAnalysis.riskScore*0.7)+(categoryRisk*0.3)
            riskScore=Math.min(riskScore,1)

            const recommendation=await this._getAIRecommendation(item,riskScore,daysUntillExpiry)

            return {
                riskScore,
                riskLevel:this._getRiskLevel(riskScore),
                recommendation,
                aiAnalysis:riskAnalysis.explanation
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }
    async _getRiskAnalysis(item,daysUntillExpiry){
        const response=await this.CohereClient.chat({
            model:'command-r-plus',
            messages:[
                {
                    role:'system',
                    content:"you are an expert in food waste management and preservation"
                },{
                    role:'user',
                    content:`Analyze the risk of food waste management
                        Item:${item.name},
                        Category:${item.category},
                        days untill expiry:${daysUntillExpiry},
                        Storage condition:${item.storageCondition} || 'Normal'

                        Provide
                        1. Risk level (0-1)
                        2. Breif explanation of the risk factors`
                }
            ]
        })
        const analysis=response?.message?.content[0]?.text;
        console.log('AI Response:',analysis);

        const riskScore=this._extractRiskScore(analysis)

        return {
            riskScore,
            explanation:analysis
        };
    }
    async _getAIRecommendation(item,riskscore,daysUntillExpiry){
        const response=await this.CohereClient.chat({
            model:'command-r-plus',
            messages:[
                {
                    role:'system',
                    content:'You are an expert in food inventory management and waste reduction .Provide consice,actionable recommendations.'
                },{
                    role:'user',
                    content:`Provide specific recommendation for:
                        Item:${item.name},
                        Category:${item.category},
                        Risk Score :${riskscore},
                        Days until expiry:${daysUntillExpiry}
                        Give consice and actionable recommendation.`
                }
            ]
        })
        return response.text;
    }
    async _getCategoryRisk(category){
        const baseRisk={
            'Fruits & Vegetables':0.8,
            'Dairy & Eggs':0.7,
            'Meat':0.9,
            'Grains':0.6,
            'Prepared Food':0.9,
            'Other':0.5
        }
        return baseRisk[category] || 0.5
    }
    _getRiskLevel(score){
        if (score>=0.7) return 'High';
        if (score>=0.3) return 'Medium';
        return 'Low'
    }
    _extractRiskScore(analysis){
        const scoreMatch=analysis.match(/Risk score : (0\.\d+)/);
        return scoreMatch ? parseFloat(scoreMatch[1]) : 0;
    }
}
module.exports=new MLService();