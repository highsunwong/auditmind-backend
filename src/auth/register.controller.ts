import { createOnboardingAudit } from "../services/onboarding.service";

export async function registerController(req: Request, res: Response) {
  const { email, password, tenantName } = req.body;
  if (!email || !password || !tenantName)
    return res.status(400).json({ error: "Missing required fields" });

  try {
    const tenant = createTenant(tenantName);
    const user = createUser(email, password, tenant.id, "ADMIN");
    const token = generateToken(user);

    // 🔄 Create onboarding audit
    const onboarding = await createOnboardingAudit(tenant.id);

    res.status(201).json({
      message: "Registration successful",
      tenantId: tenant.id,
      token,
      onboardingAudit: onboarding.audit,
      demoPlan: onboarding.demoPlan
    });
  } catch (err) {
    res.status(500).json({ error: "Registration failed", details: err });
  }
}