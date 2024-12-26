export const validateName = (name:string)=>{
   const trimmedName = name.trim().replace(/\s+/g, ' '); 
   const validNamePattern = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
   return validNamePattern.test(trimmedName)
}

export const validateEmail = (email:string)=>{
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return regex.test(email)
}

export const validatePassword = (password:string)=>{
   const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[\W_])(?=.*\d)(?!.*\s).{6,}$/;
   return passwordRegex.test(password)
}

export const validateConfirmPassword = (password: string,confirmPassword: string): boolean => {
   return password === confirmPassword;
};

export const validate = (name:string,email:string,password:string,confirmPassword:string)=>{
   if(!name.trim()){
      return "please enter name"
   }
   if(!validateName(name)){
      return "Please enter a valid name"
   }
   if(!email.trim()){
      return "please enter email"
   }
   if(!validateEmail(email)){
      return "please enter a valid email"
   }
   if(!password.trim()){
      return "please enter password"
   }
   if(!validatePassword(password)){
      return "please enter strong password includes numbers characters and letters"
   }
   if(!confirmPassword.trim()){
      return "please enter confirm password"
   }
   if((!validateConfirmPassword(password,confirmPassword))){
      return "confirm password does not match password"
   }
   return true
}