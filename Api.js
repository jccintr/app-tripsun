
// --host=192.168.0.107
//const BASE_API = 'localhost:8000/api';
//const BASE_API = 'http://192.168.0.107:8000/api';
const BASE_API = 'https://tripsun.tk/api';
//const BASE_API = 'http://177.104.209.216:8000/api';

export default {
  //  base_storage: 'http://192.168.0.107:8000/storage',
    base_storage: 'https://tripsun.tk/storage',
  //  base_storage: 'http://177.104.209.216:8000/storage',
  getUser: async (token)=> {
    const response = await fetch(`${BASE_API}/user/${token}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },

    });
   return response;
},
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (email, password) => {
        const response = await fetch(`${BASE_API}/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
       // const json = await req.json();
        return response;
    },
    signUp: async (name, email,telefone,password) => {
        const response = await fetch(`${BASE_API}/signup`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email,telefone, password})
        });
       // const json = await req.json();
        return response;
    },
    logout: async () => {
        const token = await AsyncStorage.getItem('token');

        const req = await fetch(`${BASE_API}/logout`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    getCidades: async () => {
        const req = await fetch(`${BASE_API}/cidades`);
        const json = await req.json();
        return json;
    },
    getCidade: async (id,lat,lng) => {
        const req = await fetch(`${BASE_API}/cidade`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id,lat,lng})
        });
        const json = await req.json();
        return json;

    },
    getHorariosDisponiveis: async (idServico) => {
        const req = await fetch(`${BASE_API}/horarios/disponiveis/${idServico}`);
        const json = await req.json();
        return json;
      },
    addAgendamento: async (usuario_id,servico_id,data_agendamento,quantidade,total) => {
        const response = await fetch(`${BASE_API}/agendamentos`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({usuario_id,servico_id,data_agendamento,quantidade,total})
        });
        //const json = await req.json();
        return response;
    },
    getReviewsByServico: async (idServico) => {
        const req = await fetch(`${BASE_API}/reviews/${idServico}`);
        const json = await req.json();
        return json;
      },
    getAgendamentosByUser: async (idUsuario) => {
        const response = await fetch(`${BASE_API}/agendamentos/${idUsuario}`);
        //const json = await req.json();
        return response;
      },

};
