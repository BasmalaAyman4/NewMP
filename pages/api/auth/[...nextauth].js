import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import Environment from "@/Environment";

const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      /*  credentials: {
                mobile: { label: 'Mobile', type: 'text' }
                        }, */
      authorize: async (credentials) => {
        const { id, firstName, lastName, password, address,mobile,verify ,token,addressl,iduser,firstn,lastn} = credentials;
        if(verify){
           const user= {
            data2:{
            verify:verify,
            mobile:mobile,
            token:token,
            address:addressl,
            id:iduser,
            firstName:firstn,
            lastName:lastn,
            success:true
            }
           }
           return user
        }else if(!verify){
            try {
                const response = await axios.post(
                  `${Environment.baseURL}/api/Auth/completeDataWithOTP`,
                  {
                    id,
                    firstName,
                    lastName,
                    password,
                    address,
                  }
                );
                return response.data;
              } catch (error) {
                throw new Error(error.response.data.message);
              }
        }
       
      },
    }),

  ],
  NEXTAUTH_SECRET: "atr5-gt65-9jet",
  secret: "atr5-gt65-9jet",
  callbacks: {
    async jwt({ token, user }) {
      // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)

      return { ...token, ...user };
    },
    async session({ session, user, token }) {
      // user param present in the session(function) does not recive all the data from DB call -> fetchUserInfo(credentials.opt)

      return token;
    },
  },
  pages: {
    signIn: "/pages/Login/index.js",

  },
  session: {
    jwt: true,
  },
};

export default (req, res) => NextAuth(req, res, options);
