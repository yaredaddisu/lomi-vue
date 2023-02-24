
import {createStore} from 'vuex'
import axiosClient from "../axios";


 
const store = createStore({
state:{
 
  user: {
    token: sessionStorage.getItem('TOKEN'),
    data: {}
  },
   
  questionTypes: ["text", "select", "checkbox", "textarea"],

   users:{
    data:[],
    loading: false,
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null

   },
   dashboard: {
    loading: false,
    data: {}
  },
 work: {
    loading: false,
    data: {}
  },
   currentWork: {
    loading: false,
    data: {}
  },
  payment: {
    loading: false,
    data: {}
  },
  only_payment: {
    loading: false,
    data: {}
  },
  
  member_payment: {
    data:[],
    loading: false,
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null
  },
   help: {
    data:[],
    loading: false,
   links: [],
   from: null,
   to: null,
   page: 1,
   limit: null,
   total: null
  },
  current_Price:{
    loading:false,
    data:{}
   },
   currentMember:{
    loading:false,
    data:{}
   },
   currentProduct:{
    loading:false,
    data:{}
   },
   products: {
    data:[],
    loading: false,
   links: [],
   from: null,
   to: null,
   page: 1,
   limit: null,
   total: null
  },  
    plans:{
    loading:false,
    data:{}
   },
   currentUser:{
    loading:false,
    data:{}
   },
   currentHelp:{
    loading:false,
    data:{}
   },
   currentPrice:{
    loading: false,
    data: {},
    links: [],
    from: null,
    to: null,
    page: 1,
    limit: null,
    total: null
   },
   logos:{
    loading:false,
    data:[]
   },
   members:{
     loading: false,
     data: [],
     links: [],
     from: null,
     to: null,
     page: 1,
     limit: null,
     total: null
   },
   notification: {
    show: false,
    type: 'success',
    message: ''
  }

},
getters: {

},
actions:{
  getDashboardData({commit}) {
    commit('dashboardLoading', true)
    return axiosClient.get(`/dashboard`)
    .then((res) => {
      commit('dashboardLoading', false)
      commit('setDashboardData', res.data)
      return res;
    })
    .catch(error => {
      commit('dashboardLoading', false)
      return error;
    })

  },
  getPayment({commit}) {
    commit('getPaymentLoading', true)
    return axiosClient.get(`/get-payment`)
    .then((res) => {
      commit('getPaymentLoading', false)
      commit('setPayment', res.data)
      return res;
    })
    .catch(error => {
      commit('getPaymentLoading', false)
      return error;
    })

  },
 
  
  getOnlyPlans({commit}) {
    commit('getgetOnlyPlansLoading', true)
    return axiosClient.get(`/get-only-payment`)
    .then((res) => {
      commit('getgetOnlyPlansLoading', false)
      commit('setgetOnlyPlans', res.data)
      return res;
    })
    .catch(error => {
      commit('getgetOnlyPlansLoading', false)
      return error;
    })

  },


getProducts({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction,  filed, direction} = {}) {
    commit('setProducts', [true])
    commit('setProductsLoading', true)
    url = url || 'product'
    const params = {
      per_page: state.products.limit,
    }
    return axiosClient.get(url, {
      params: {
        ...params,
        search, per_page, sort_field, sort_direction, filed, direction
      },

    })
      .then((response) => {
        commit('setProducts', [false, response.data])
      })
      .catch(() => {
        commit('setProducts', [false])
      })
  },
  
getWorks({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction,  filed, direction} = {}) {
  commit('setWorks', [true])
  commit('setWorksLoading', true)
  url = url || 'work'
  const params = {
    per_page: state.work.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction, filed, direction
    },

  })
    .then((response) => {
      commit('setWorks', [false, response.data])
    })
    .catch(() => {
      commit('setWorks', [false])
    })
},
  
  getMemberPayment({commit, state}, {url = null, per_page, sort_field, sort_direction,  filed, direction} = {}) {
    commit('setMemberPayment', [true])
    commit('setMemberPaymentLoading', true)
    url = url || 'member_payment'
    const params = {
      per_page: state.member_payment.limit,
    }
    return axiosClient.get(url, {
      params: {
        ...params,
         per_page, sort_field, sort_direction, filed, direction
      },

    })
      .then((response) => {
        commit('setMemberPayment', [false, response.data])
      })
      .catch(() => {
        commit('setMemberPayment', [false])
      })
  },
  
  getHelps({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction,  filed, direction} = {}) {
    commit('setHelps', [true])
    url = url || '/help'
    const params = {
      per_page: state.help.limit,
    }
    return axiosClient.get(url, {
      params: {
        ...params,
        search, per_page, sort_field, sort_direction, filed, direction
      }
    })
      .then((response) => {
        commit('setHelps', [false, response.data])
      })
      .catch(() => {
        commit('setHelps', [false])
      })
  },
  
  getProduct({ commit }, id) {
    commit("setCurrentProductLoading", true);
    return axiosClient
      .get(`/product/${id}`)
      .then((res) => {
        commit("setCurrentProduct", res.data);
        commit("setCurrentProductLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentProductLoading", false);
        throw err;
      });
  },
  getWork({ commit }, id) {
    commit("setCurrentWorkLoading", true);
    return axiosClient
      .get(`/work/${id}`)
      .then((res) => {
        commit("setCurrentWork", res.data);
        commit("setCurrentWorkLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentWorkLoading", false);
        throw err;
      });
  },
  getHelp({ commit }, id) {
    commit("setCurrentHelpLoading", true);
    return axiosClient
      .get(`/help/${id}`)
      .then((res) => {
        commit("setCurrentHelp", res.data);
        commit("setCurrentHelpLoading", false);
        return res;
      })
      .catch((err) => {
        commit("setCurrentHelpLoading", false);
        throw err;
      });
  },
  saveProduct({ commit, dispatch }, product) {

    delete product.image_url;

    let response;
    if (product.id) {
      response = axiosClient
        .put(`/product/${product.id}`, product)
        .then((res) => {
          commit('setCurrentProduct', res.data)
          return res;
        });
    } else {
      response = axiosClient.post("/product", product).then((res) => {
        commit('setCurrentProduct', res.data)
        return res;
      });
    }

    return response;
  },
  saveWork({ commit, dispatch }, work) {

 
    let response;
    if (work.id) {
      response = axiosClient
        .put(`/work/${work.id}`, work)
        .then((res) => {
          commit('setCurrentWork', res.data)
          return res;
        });
    } else {
      response = axiosClient.post("/work", work).then((res) => {
        commit('setCurrentWork', res.data)
        return res;
      });
    }

    return response;
  },
  saveHelp({ commit, dispatch }, help) {

    delete help.image_url;

    let response;
    if (help.id) {
      response = axiosClient
        .put(`/help/${help.id}`, help)
        .then((res) => {
          commit('setCurrentHelp', res.data)
          return res;
        });
    } else {
      response = axiosClient.post("/help", help).then((res) => {
        commit('setCurrentHelp', res.data)
        return res;
      });
    }

    return response;
  },
  
  getCurrentUser({commit}, data) {
    return axiosClient.get('/user', data)
      .then(({data}) => {
        commit('setUser', data);
        return data;
      })
  },
  updateProfile ({commit}, userData) {
    delete userData.image_url;
  let response;
    const token = store.state.user.token // get the token from state
    response = axiosClient.put('/update-data',
            {
                name: userData.name,
                email: userData.email,
                image: userData.image,
                phone: userData.phone,

            })
            .then(res => {

              if(res){
                store.commit("notify", {
                  type: "success",
                  message:  "Profile successfully updated",
                    });
              }

              commit('setUser', res.data)

              return res;


            })
            store.dispatch('getUser')

            return response;


},
savePlan ({commit}, model) {
    delete model.image_url;
  let response;
     response = axiosClient.post('/save-plan', model
            )
            .then(res => {

              if(res){
                store.commit("notify", {
                  type: "success",
                  message:  "Profile successfully updated",
                    });
              }

 
              return res;


            })
            store.dispatch('getUser')

            return response;


},
savePrice({ commit }, price) {
  delete price.image_url;

  let response;
  if (price.id) {

    response = axiosClient
      .put(`/price/${price.id}`, price)
      .then((res) => {

        commit('setCurrentPrice', res.data)
        return res;
      });
  } else {
    response = axiosClient.post("/price", price).then((res) => {

      commit("setCurrentPrice", res.data)
      return res;
    });
  }

  return response;
},

   register({commit}, user) {
      return axiosClient.post('/register', user)
        .then(({data}) => {
          commit('setUser', data.user);
          commit('setToken', data.token)
            return data;
        })
    },
    login({commit}, user) {
      return axiosClient.post('/login', user)
        .then(({data}) => {
          commit('setUser', data.user);
          commit('setToken', data.token)
            return data;
        })
    },
    logout({commit}) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout')
          return response;
        })
    },
    saveMember({ commit }, member) {
      delete member.image_url;

      let response;
      if (member.id) {

        response = axiosClient
          .put(`/member/${member.id}`, member)
          .then((res) => {

            commit('setCurrentMember', res.data)
            return res;
          });
      } else {
        response = axiosClient.post("/member", member).then((res) => {

          commit("setCurrentMember", res.data)
          return res;
        });
      }

      return response;
    },
    createUser({ commit }, user) {
      delete user.image_url;

      let response;
      if (user.id) {

        response = axiosClient
          .put(`/user-managment/${user.id}`, user)
          .then((res) => {

            commit('setCurrentUser', res.data)
            return res;
          });
      } else {
        response = axiosClient.post("/user-managment", user).then((res) => {

          commit("setCurrentUser", res.data)
          return res;
        });
      }

      return response;
    },
    
    saveLogo({ commit, dispatch }, logo) {

      delete logo.image_url;

      let response;
      if (logo.id) {
        response = axiosClient
          .put(`/logo/${logo.id}`, logo)
          .then((res) => {
            commit('setCurrentLogo', res.data)
            return res;
          });
      } else {
        response = axiosClient.post("/logo", logo).then((res) => {
          commit('setCurrentLogo', res.data)
          return res;
        });
      }

      return response;
    },
    saveField({ commit, dispatch }, field) {

 
      let response;
      if (field.id) {
        response = axiosClient
          .put(`/field/${field.id}`, field)
          .then((res) => {
            commit('setCurrentField', res.data)
            return res;
          });
      } else {
        response = axiosClient.post("/field", field).then((res) => {
          commit('setCurrentField', res.data)
          return res;
        });
      }

      return response;
    },
    getLogo({ commit }, id) {
      commit("setCurrentLogoLoading", true);
      return axiosClient
        .get(`/logo/${id}`)
        .then((res) => {
          commit("setCurrentLogo", res.data);
          commit("setCurrentLogoLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentLogoLoading", false);
          throw err;
        });
    },
    getField({ commit }, id) {
      commit("setCurrentFieldLoading", true);
      return axiosClient
        .get(`/field/${id}`)
        .then((res) => {
          commit("setCurrentField", res.data);
          commit("setCurrentFieldLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentFieldLoading", false);
          throw err;
        });
    },
    getUserManagment({ commit }, id) {
      commit("setCurrentUserLoading", true);
      return axiosClient
        .get(`/user-managment/${id}`)
        .then((res) => {
          commit("setCurrentUser", res.data);
          commit("setCurrentUserLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentUserLoading", false);
          throw err;
        });
    },
    getMember({ commit }, id) {
      commit("setCurrentMemberLoading", true);
      return axiosClient
        .get(`/member/${id}`)
        .then((res) => {
          commit("setCurrentMember", res.data);
          commit("setCurrentMemberLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentMemberLoading", false);
          throw err;
        });
    },
    
  getPlan({ commit }, id) {
      commit("setCurrentPlanLoading", true);
      return axiosClient
        .get(`/price/${id}`)
        .then((res) => {
          commit("setCurrentPlan", res.data);
          commit("setCurrentPlanLoading", false);
          return res;
        })
        .catch((err) => {
          commit("setCurrentPlanLoading", false);
          throw err;
        });
    },
    
    getLogos({ commit }, {url = null} = {}) {
      commit('setLogosLoading', true)
      url = url || "/logo";
      return axiosClient.get(url).then((res) => {
        commit('setLogosLoading', false)
        commit("setLogos", res.data);
        return res;
      });
    },
 
    getPlans({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction,  filed, direction} = {}) {
      commit('setPlans', [true])
      url = url || '/price'
      const params = {
        per_page: state.currentPrice.limit,
      }
      return axiosClient.get(url, {
        params: {
          ...params,
          search, per_page, sort_field, sort_direction, filed, direction
        }
      })
        .then((response) => {
          commit('setPlans', [false, response.data])
        })
        .catch(() => {
          commit('setPlans', [false])
        })
    },
 getUserPlans({ commit }, {url = null} = {}) {
      commit('setUserPlansLoading', true)
      url = url || "/save-plan";
      return axiosClient.get(url).then((res) => {
        commit('setUserPlansLoading', false)
        commit("setUserPlans", res.data);
        return res;
      });
    },
    getFields({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction,  filed, direction} = {}) {
      commit('setFields', [true])
      url = url || '/field'
      const params = {
        per_page: state.fields.limit,
      }
      return axiosClient.get(url, {
        params: {
          ...params,
          search, per_page, sort_field, sort_direction, filed, direction
        }
      })
        .then((response) => {
          commit('setFields', [false, response.data])
        })
        .catch(() => {
          commit('setFields', [false])
        })
    },

 getMembers({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction,  filed, direction} = {}) {
  commit('setMembers', [true])
  url = url || '/member'
  const params = {
    per_page: state.members.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction, filed, direction
    }
  })
    .then((response) => {
      commit('setMembers', [false, response.data])
    })
    .catch(() => {
      commit('setMembers', [false])
    })
},

getUsers({commit, state}, {url = null, search = '', per_page, sort_field, sort_direction,  filed, direction} = {}) {
  commit('setUsers', [true])
  url = url || '/user-managment'
  const params = {
    per_page: state.members.limit,
  }
  return axiosClient.get(url, {
    params: {
      ...params,
      search, per_page, sort_field, sort_direction, filed, direction
    }
  })
    .then((response) => {
      commit('setUsers', [false, response.data])
    })
    .catch(() => {
      commit('setUsers', [false])
    })
},

deleteMember({ }, id) {
  return axiosClient.delete(`/member/${id}`);

},

deleteUser({ }, id) {
  return axiosClient.delete(`/users/${id}`);

},

deleteHelp({ }, id) {
  return axiosClient.delete(`/help/${id}`);

},
deleteProduct({ }, id) {
  return axiosClient.delete(`/product/${id}`);

},
deletePlan({ }, id) {
  return axiosClient.delete(`/price/${id}`);

},
deleteClient({ }, id) {
  return axiosClient.delete(`/plan/${id}`);

},
deleteLogo({ }, id) {
  return axiosClient.delete(`/logo/${id}`);

},

deleteAllMember({ }, checked) {
  return axiosClient.post("/member/deleteAll/", {data: checked})
  .then((response)=>{
   })

},


deleteMemberPayment({ }, checked) {
  return axiosClient.post("/member/delete-all-payment/", {data: checked})
  .then((response)=>{
   })

},
deleteUserPayment({ }, checked) {
  return axiosClient.post("/user/delete-all-payment/", {data: checked})
  .then((response)=>{
   })

},
deletePlanAll({ }, checked) {
  return axiosClient.post("/price/deleteAll/", {data: checked})
  .then((response)=>{
   })

},


deleteLogoAll({ }, checked) {
  return axiosClient.post("/logo/deleteall/", {data: checked})
  .then((response)=>{
   })

},
deleteLogo({ }, id) {
  return axiosClient.delete(`/logo/${id}`);

},

deleteAllUser({ }, checked) {
  return axiosClient.post(`/users/deleteAllUser/`, {data: checked})
   

},
   getUser({commit}) {
      return axiosClient.get('/user')
      .then(res => {
        //console.log(res);
        commit('setUser', res.data)
      })
    },

    deleteLogo({ }, id) {
      return axiosClient.delete(`/logo/${id}`);

    },

},
mutations: {

  
  
  setMemberPaymentLoading: (state, loading) => {
    state.member_payment.loading = loading;
  },
  setMemberPayment(state, [loading, data = null]) {

    if (data) {
      state.member_payment = {
        ...state.member_payment,
        data: data.data,
        links: data.meta?.links,
        page: data.meta.current_page,
        limit: data.meta.per_page,
        from: data.meta.from,
        to: data.meta.to,
        total: data.meta.total,
      }
    }
    state.member_payment.loading = loading;
  },
  
  setProductsLoading: (state, loading) => {
    state.products.loading = loading;
  },
  setProducts(state, [loading, data = null]) {

    if (data) {
      state.products = {
        ...state.products,
        data: data.data,
        links: data.meta?.links,
        page: data.meta.current_page,
        limit: data.meta.per_page,
        from: data.meta.from,
        to: data.meta.to,
        total: data.meta.total,
      }
    }
    state.products.loading = loading;
  },
//

setWorksLoading: (state, loading) => {
  state.work.loading = loading;
},
setWorks(state, [loading, data = null]) {

  if (data) {
    state.work = {
      ...state.work,
      data: data.data,
      links: data.meta?.links,
      page: data.meta.current_page,
      limit: data.meta.per_page,
      from: data.meta.from,
      to: data.meta.to,
      total: data.meta.total,
    }
  }
  state.work.loading = loading;
},
///

  dashboardLoading: (state, loading) => {
    state.dashboard.loading = loading;
  },
  setDashboardData: (state, data) => {
    state.dashboard.data = data
  },
  
  getPaymentLoading: (state, loading) => {
    state.payment.loading = loading;
  },
  setPayment: (state, data) => {
    state.payment.data = data
  },
  getWorkLoading: (state, loading) => {
    state.work.loading = loading;
  },
  setWork: (state, data) => {
    state.work.data = data
  },
  
  getgetOnlyPlansLoading: (state, loading) => {
    state.only_payment.loading = loading;
  },
  setgetOnlyPlans: (state, data) => {
    state.only_payment.data = data
  },
  
  setCurrentProductLoading: (state, loading) => {
    state.currentProduct.loading = loading;
  },
  setCurrentProduct: (state, product) => {
    state.currentProduct.data = product.data;
  },
  setCurrentWorkLoading: (state, loading) => {
    state.currentWork.loading = loading;
  },
  setCurrentWork: (state, work) => {
    state.currentWork.data = work.data;
  },

  setCurrentPlanLoading: (state, loading) => {
    state.current_Price.loading = loading;
  },
  setCurrentPlan: (state, current_Price) => {
    state.current_Price.data = current_Price.data;
  },  
  setCurrentHelpLoading: (state, loading) => {
    state.currentHelp.loading = loading;
  },
  setCurrentHelp: (state, help) => {
    state.currentHelp.data = help.data;
  },
  
  setHelpsLoading: (state, loading) => {
    state.help.loading = loading;
  },
 
  setHelps(state, [loading, data = null]) {

    if (data) {
      state.help = {
        ...state.help,
        data: data.data,
        links: data.meta?.links,
        page: data.meta.current_page,
        limit: data.meta.per_page,
        from: data.meta.from,
        to: data.meta.to,
        total: data.meta.total,
      }
    }
    state.help.loading = loading;
  },
  setMembersLoading: (state, loading) => {
    state.members.loading = loading;
  },
    setCurrentLogoLoading: (state, loading) => {
      state.logos.loading = loading;
    },
    setCurrentLogo: (state, logos) => {
      state.logos.data = logos.data;
    },
 

    /////

    setPlansLoading: (state, loading) => {
      state.currentPrice.loading = loading;
    },
   
    setPlans(state, [loading, data = null]) {

      if (data) {
        state.currentPrice = {
          ...state.currentPrice,
          data: data.data,
          links: data.meta?.links,
          page: data.meta.current_page,
          limit: data.meta.per_page,
          from: data.meta.from,
          to: data.meta.to,
          total: data.meta.total,
        }
      }
      state.currentPrice.loading = loading;
    },
  
    
    setLogosLoading: (state, loading) => {
      state.logos.loading = loading;
    },
    setLogos: (state, logos) => {
       state.logos.data = logos.data;
    },
    ////
    setCurrentFieldLoading: (state, loading) => {
      state.fields.loading = loading;
    },
    setCurrentField: (state, fields) => {
      state.fields.data = fields.data;
    },
    setFieldsLoading: (state, loading) => {
      state.fields.loading = loading;
    },
   

       
   setFields(state, [loading, data = null]) {

    if (data) {
      state.fields = {
        ...state.fields,
        data: data.data,
        links: data.meta?.links,
        page: data.meta.current_page,
        limit: data.meta.per_page,
        from: data.meta.from,
        to: data.meta.to,
        total: data.meta.total,
      }
    }
    state.fields.loading = loading;
  },

///
setCurrentUserLoading: (state, loading) => {
  state.currentUser.loading = loading;
},
setCurrentUser: (state, currentUser) => {
  state.currentUser.data = currentUser.data;
},
setCurrentPrice: (state, currentPrice) => {
  state.currentPrice.data = currentPrice.data;
},

setUsersLoading: (state, loading) => {
  state.currentUser.loading = loading;
},
setUsers: (state, currentUser) => {
   state.currentUser.data = currentUser.data;
},

setUserPlansLoading: (state, loading) => {
  state.plans.loading = loading;
},
setUserPlans: (state, plans) => {
   state.plans.data = plans.data;
},

  setMembers(state, [loading, data = null]) {

    if (data) {
      state.members = {
        ...state.members,
        data: data.data,
        links: data.meta?.links,
        page: data.meta.current_page,
        limit: data.meta.per_page,
        from: data.meta.from,
        to: data.meta.to,
        total: data.meta.total,
      }
    }
    state.members.loading = loading;
  },

  setUsers(state, [loading, data = null]) {

    if (data) {
      state.users = {
        ...state.users,
        data: data.data,
        links: data.meta?.links,
        page: data.meta.current_page,
        limit: data.meta.per_page,
        from: data.meta.from,
        to: data.meta.to,
        total: data.meta.total,
      }
    }
    state.users.loading = loading;
  },
  setCurrentMember: (state, member) => {
    state.currentMember.data = member.data;
  },
  setCurrentMemberLoading: (state, loading) => {
    state.currentMember.loading = loading;
  },
  setCurrentField: (state, field) => {
    state.fields.data = field.data;
  },
  setUser(state, user) {
    state.user.data = user;
  },
  setToken: (state, token) => {
    state.user.token = token;
    sessionStorage.setItem('TOKEN', token);
  },
  logout: (state) => {
    state.user.token = null;
    state.user.data = {};
    sessionStorage.removeItem("TOKEN");
  },


    notify: (state, {message, type}) => {
      state.notification.show = true;
      state.notification.type = type;
      state.notification.message = message;
      setTimeout(() => {
        state.notification.show = false;
      }, 3000)
    },
},
modules:{},
})

export default store;
