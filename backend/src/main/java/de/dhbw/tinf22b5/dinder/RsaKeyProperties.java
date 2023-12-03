package de.dhbw.tinf22b5.dinder;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

public record RsaKeyProperties(RSAPublicKey publicKey, RSAPrivateKey privateKey)
{
}