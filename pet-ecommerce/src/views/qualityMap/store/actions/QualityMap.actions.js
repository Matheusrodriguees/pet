
import { ATUALIZA_MAPA_DE_QUALIDADE } from '../actionTypes';

import { MAPA_DE_QUALIDADE_ROUTE } from '../../../../constants/routes';

import axios from 'axios';


export const carregarMapa = (ano,mes) => {
    console.log('************** ACTIONS')
    return async dispatch => {
        console.log('dentro do return')
        try {
           // console.log(`${MAPA_DE_QUALIDADE_ROUTE}/${ano}/${mes}`)
           // const { data } = await axios.get(`${MAPA_DE_QUALIDADE_ROUTE}/${ano}/${mes}`);
            let data = 
                {
               
                    "chart" : {
                        "labels" : ["03 Dias (MPa)","07 Dias (MPa)","28 Dias (MPa)"],
                        "media"  : [14.10,25.32,36.34],
                        "limites": [10,20,32]
                    },
                    "product": [
                        {
                            "name": "CP V-ARI CAUE ESTRUTURA SACO 40KG"
                        }
                    ],
                    "categories": [
                        {
                            "name": "EXIGÊNCIAS FÍSICAS E MECÂNICAS",
                            "data": [
                                {
                                    "name": "FINURA",
                                    "headers": [
                                        "Blaine (cm²/g)",
                                        "# 200 (%)",
                                        "# 325 (%)"
                                    ],
                                    "values": [
                                        [
                                            "Exigência",
                                            "-",
                                            "<= 6,0",
                                            "-"
                                        ],
                                        [
                                            "Média",
                                            "              5.203",
                                            "                0,1",
                                            "                0,7"
                                        ],
                                        [
                                            "Desvio Padrão",
                                            "                 94",
                                            "                0,1",
                                            "                0,2"
                                        ],
                                        [
                                            "Qtd Dados",
                                            "                 18",
                                            "                 18",
                                            "                 18"
                                        ]
                                    ]
                                },
                                {
                                    "name": "TEMPO DE PEGA",
                                    "headers": [
                                        "Início de Pega (min)",
                                        "Fim de Pega (min)"
                                    ],
                                    "values": [
                                        [
                                            "Exigência",
                                            ">= 60",
                                            "<= 600"
                                        ],
                                        [
                                            "Média",
                                            "                128",
                                            "                245"
                                        ],
                                        [
                                            "Desvio Padrão",
                                            "                 12",
                                            "                 13"
                                        ],
                                        [
                                            "Qtd Dados",
                                            "                 18",
                                            "                 18"
                                        ]
                                    ]
                                },
                                {
                                    "name": "RESISTÊNCIA À COMPRESSÃO",
                                    "headers": [
                                        "01 Dia (MPa)",
                                        "03 Dias (MPa)",
                                        "07 Dias (MPa)"
                                    ],
                                    "values": [
                                        [
                                            "Exigência",
                                            ">= 14,0",
                                            ">= 24,0",
                                            ">= 34,0"
                                        ],
                                        [
                                            "Média",
                                            "               29,9",
                                            "               40,1",
                                            "               43,9"
                                        ],
                                        [
                                            "Desvio Padrão",
                                            "                1,0",
                                            "                0,8",
                                            "                0,7"
                                        ],
                                        [
                                            "Qtd Dados",
                                            "                 18",
                                            "                 18",
                                            "                 18"
                                        ]
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "EXIGÊNCIAS QUÍMICAS",
                            "data": [
                                {
                                    "name": "(%)",
                                    "headers": [
                                        "MgO (%)",
                                        "SO3 Média (%)",
                                        "Perda ao Fogo Média (%)",
                                        "Resíduo Insolúvel (%)"
                                    ],
                                    "values": [
                                        [
                                            "Exigência",
                                            "<= 6,5",
                                            "<= 4,5",
                                            "<= 6,5",
                                            "-"
                                        ],
                                        [
                                            "Média",
                                            "                2,7",
                                            "                4,0",
                                            "                3,9",
                                            "-"
                                        ],
                                        [
                                            "Desvio Padrão",
                                            "                0,1",
                                            "                0,2",
                                            "                0,4",
                                            "-"
                                        ],
                                        [
                                            "Qtd Dados",
                                            "                 17",
                                            "                 17",
                                            "                 18",
                                            "                  0"
                                        ]
                                    ]
                                }
                            ]
                        }
                    ],
                    "norma": "NBR-16697",
                    "техническийменеджер": "Jailson Mathias de Souza"
                }
            


            console.log(data)
            console.log('ano',ano)
            console.log('mes',mes)

            if(!ano || !mes){
                data = []
            }
          
            return dispatch({
                type: ATUALIZA_MAPA_DE_QUALIDADE,
                mapa: data
            })
        } catch (err) {
            console.log('****************')
            console.log(err)
            console.log("Problemas ao carregar mapa de qualidade")
        }
    }
}
