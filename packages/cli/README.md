<div align="center">
  <br>
  <br>
  <img alt="gitbeaker" src="https://raw.githubusercontent.com/jdalrymple/gitbeaker/main/.github/ASSETS/header.svg">
  <br>
  <br>
  <br>
</div>

<div align="center">
  <p>
		<sup>
			<a href="https://github.com/jdalrymple">My open source work is supported by the community</a>
		</sup>
	</p>
  <br>
	<sup>Special thanks to:</sup>
	<br>
	<br>

  <a href="https://wearecws.com/">
    <img src="https://wearecws.com/images/brand/cws-logo.svg" width="210">
  </a>

  <br>
  <hr>
</div>

<p align="center">
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="pipeline status" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/pipeline.svg?ignore_skipped=true" /></a>
   <a href="https://gitlab.com/jdalrymple/gitbeaker/-/commits/main"><img alt="coverage report" src="https://gitlab.com/jdalrymple/gitbeaker/badges/main/coverage.svg?job=test:unit:cli" /></a>
  <a href="https://codeclimate.com/github/jdalrymple/gitbeaker">
    <img src="https://codeclimate.com/github/jdalrymple/gitbeaker/badges/gpa.svg" alt="Code Climate maintainability">
  </a>
  <a href="https://github.com/intuit/auto">
    <img src="https://img.shields.io/badge/release-auto.svg?colorA=888888&colorB=9B065A&label=auto" alt="Auto">
  </a>
  <a href="#contributors-">
    <img src="https://img.shields.io/badge/all_contributors-orange.svg?style=round" alt="All Contributors" />
  </a>
  <img src="https://img.shields.io/badge/code%20style-prettier-ff69b4.svg" alt="Prettier">
  <a href="LICENSE.md">
    <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="Licence: MIT">
  </a>
  <a href="https://packagephobia.com/result?p=@gitbeaker/cli">
    <img src="https://packagephobia.com/badge?p=@gitbeaker/cli" alt="Install Size: CLI">
  </a>
</p>

> A CLI Wrapper for the [@gitbeaker/rest](https://www.npmjs.com/package/@gitbeaker/rest) SDK.

## Table of Contents

- [Usage](#usage)
- [Testing](../../docs/TESTING.md)
- [FAQ](../../docs/FAQ.md)
- [Contributors](#contributors)
- [Changelog](./CHANGELOG.md)

## Usage

<table>
<tbody valign=top align=left>
<tr><th>
Node 18+
</th><td>

Install with <code>npm install -g @gitbeaker/cli</code>, or <code>yarn add -g @gitbeaker/cli</code>

```bash
gitbeaker [service name] [method name] --config_args pos_arg1 pos_argN --opts_arg1 --opts_argN

# A shorthand can also be used:
gb [service name] [method name] --config_args pos_arg1 pos_argN --opts_arg1 --opts_argN
```

Where:

- `service name` is any of the supported API names of the [@gitbeaker/rest](https://github.com/jdalrymple/gitbeaker/blob/main/packages/rest/README.md) sdk
- `method name` is any of the supported commands on that API service (See source for exceptions, but generally all, show, remove, update)
- `--config_args` is any of general configuration arguments such as your personal token. These are outlined in this [table](https://github.com/jdalrymple/gitbeaker/blob/main/README.md?#api-client) and can also be found by looking at the cli help menu. These arguments must also include a `gb` or `gl` prefix. ie.

```bash
# To get all the projects
gitbeaker projects all --gb-token="personaltoken"
```

- `pos_arg1 ... pos_argN` are any of the arguments you would normally supply to the function. The names of the args should match the names in the method headers. These positional arguments can also be written as flag arguments: `--pos_arg1 ... --pos_argN`, **BUT** must be written in the correct order.
- `--opts_arg1 ...--opts_argN` are any of the optional arguments that you would normally supply to the function. Their names should match what the GitLab API docs request.

```bash
# To get all the projects id=2 and optional parameter "search" = "cool"
gitbeaker projects all --gb-token="personaltoken" 2 --search="cool"
```

To reduce the annoyance of having to pass those configuration properties each time, it is also possible to pass the token and host information through environment variables in the form of `GITLAB_[option name]` or `GITBEAKER_[option name]` ie:

```bash
GITLAB_HOST=http://example.com
GITLAB_TOKEN=personaltoken
GITBEAKER_CAMELIZE=true
```

</td></tr>
</tbody>
</table>

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<p>
    <tr>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/jdalrymple"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/3743662?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Justin Dalrymple"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/dylandesrosier"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/13701258?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Dylan DesRosier"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/mikew"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4729?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Mike Wyatt"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/coryzibell"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/7986014?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Cory Zibeill"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/shadygrove"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/5209850?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Martin Bour"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/akira345"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/655764?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="akira345"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://birukov.me"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/1861546?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Pavel Birukov "/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://jetersen.dev"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/1661688?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Joseph Petersen"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Musinux"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/563373?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Louis Cherel"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.arsdehnel.net"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/1697162?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Adam Dehnel"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.haus.gg/"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/226640?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Ev Haus"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://iGLOO.be"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/900947?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Loïc Mahieu"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.giuseppeangri.com"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/9075163?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Giuseppe Angri"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/jennparise"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/4134086?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="jennparise"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://obartra.github.io"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/3877773?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Oscar"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://daniel-ruf.de"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/827205?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Daniel Ruf"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/schindld"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/1659632?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="schindld"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://alvarobg.com"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/12004383?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Alvaro"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://northhorizon.net"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/616152?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Daniel Moore"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://dylanmtaylor.com"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/277927?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Dylan M. Taylor"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://pixelswap.fr/"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/4266283?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Corentin Mors"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/xatavian"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/17217965?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="xatavian"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://stackoverflow.com/story/yepninja"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/11796206?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Yevgeny Petukhov"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://about.me/mickaeltr"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/378910?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Mickaël Tricot"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/andreasciamanna"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/181780?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Andrea"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.ircad.fr/"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/8638653?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Flavien Bridault"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/s-kazuki"><img src="https://images.weserv.nl/?url=https://avatars2.githubusercontent.com/u/9253374?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="s-kazuki"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/kiprasmel"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/29430509?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Kipras Melnikovas"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Gkxie"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/27680715?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="xieyu"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/st1gok"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/13641693?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="st1gok"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/max-wittig"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/6639323?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Max Wittig"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/nlochschmidt"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/759624?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Niklas Lochschmidt"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/illyaMs"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/26578665?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Ilya Dus"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/wamry"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/32439651?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Omar Awamry"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Sumragen"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/15640910?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Hennadii Varava"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/xiezht"><img src="https://images.weserv.nl/?url=https://avatars1.githubusercontent.com/u/18051618?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="xiezht"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.martin-helmich.de/en"><img src="https://images.weserv.nl/?url=https://avatars3.githubusercontent.com/u/2538958?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Martin Helmich"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/smcgivern"><img src="https://images.weserv.nl/?url=https://avatars0.githubusercontent.com/u/1120328?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Sean McGivern"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Vogel612"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/7288995?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Clemens Lieb"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://sajdl.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/5222912?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Vojtěch Sajdl"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/divido"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4614626?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="divido"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/vboulaye"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/652767?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Vincent Boulaye"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Aliyss"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/33941859?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Aliyss Snow"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/saada"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1087987?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Mahmoud Saada"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/F3n67u"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/12343178?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Feng Yu"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://datatra.sh/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/173822?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Roy Jacobs"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.paullemke.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/976010?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Paul Lemke"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://jenko.me/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/131355?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Ian Jenkins"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.nilennoct.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4055220?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="nilennoct"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://michael.laffargue.fr/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/503129?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Laffargue Michael"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/MartinHowarth"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/7187425?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Martin Howarth"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/christophlehmann"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4953689?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Christoph Lehmann"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://theopensourceu.org/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/253471?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Frank V"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Salimlou"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/357286?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Salim Benabbou"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/tvtamas"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1945260?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Tamás Török-Vistai"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/MartinBenninger"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/20296116?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Martin Benninger"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/fewieden"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/9334168?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="fewieden"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.jeffpelton.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/36627?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Jeff Pelton"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/claude-abounegm"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/11809881?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Claude Abounegm"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Marethyu1"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/17978203?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Stefan Hall"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Mr-Wallet"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/799000?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Jordan Wallet"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/zhao0"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/7556666?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="zhao0"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.linkedin.com/in/joshuagrosso"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4530584?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Joshua Grosso"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/yonguelink"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/9469187?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Isaac Ouellet Therrien"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://wearecws.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/24895138?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Rajat Sharma"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Casz"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/65105345?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Cesar B."/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://blog.katsuba.dev/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/10637135?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Igor Katsuba"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.doublespeakgames.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4884483?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Michael Townsend"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/bodtx"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1039550?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="bodtx"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/arthot"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1815294?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Artem"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://muniftanjim.dev/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/8050659?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Munif Tanjim"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.qkdreyer.dev/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/717869?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Quentin Dreyer"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://iwritethe.codes/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/192728?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Norm MacLennan"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/jnovick"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/7881319?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="jnovick"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.fabianaussems.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/57530?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Fabian Aussems"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/mima0815"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/14311597?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Michael Matzka"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/CraigAllardyce"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/9052289?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="CraigAllardyce"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/brunobastosg"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/320122?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Bruno Guimarães"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://leipert.io/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/2906107?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Lukas Eipert"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://max.krauss.io/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/914671?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Maximilian Krauß"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://eng.evolution.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/15799569?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Evolution Engineering"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Neonox31"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1135958?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="WEBER Logan"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://t.me/mister_cheater"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/5055654?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Anton Zhukov"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/beaverusiv"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/4149031?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Nicholas Loomans"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://icedream.pw/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/807772?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Carl Kittelberger"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://patrik.votocek.cz/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/112567?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Patrik Votoček"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://kyr.github.io/CV/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/426462?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Kyrylo Fedorov"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/claudio-vellage"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/28930612?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Claudio Vellage"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/seb0uil"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/5122626?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Seb0uil"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://merorafael.info/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/3404989?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Rafael Mello"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/tbazin"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/9104039?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Théis Bazin"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://spencersalisbury.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/8053224?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Spencer Salisbury"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://simonecorsi.dev/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/5617452?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Simone Corsi"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Bambii556"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/34485027?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Bambii"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/ravewill"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/128541928?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Will"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/ArnaudTA"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/33383276?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="ArnaudTA"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/kouak"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/48335?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Benjamin Beret"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/demedos"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/16702156?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Alessandro Diez"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/artlist-scottambrose"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/124692101?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="artlist-scottambrose"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/mercutiodesign"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1114120?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Martin Dreher"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/glensc"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/199095?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Elan Ruusamäe"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Artemoire"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/18062266?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="artemoire"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/pataar"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/3403851?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Pieter Willekens"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/Djcd"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/761764?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="David Claybourne"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/domharrington"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/848223?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Dom Harrington"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/kseino"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/1378066?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Kohei Seino"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://www.1stg.me/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/8336744?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="JounQin"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/elaine-mattos"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/79633988?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Elaine Mattos"/></td>
      <td align="center" valign="top" width="0.33%"><a href="https://github.com/vitamindck"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/10766587?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="DK"/></td>
      <td align="center" valign="top" width="0.33%"><a href="http://www.koenbrouwer.com/"><img src="https://images.weserv.nl/?url=https://avatars.githubusercontent.com/u/3260168?v=4&h=25&w=25&fit=cover&mask=circle&maxage=7d" alt="Koen Brouwer"/></td>
    </tr>
</p>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This started as a fork from [node-gitlab-legacy](https://github.com/rest-gitlab/rest-gitlab-legacy) but I ended up rewriting much of the code. Here are the original work's [contributors](https://github.com/rest-gitlab/rest-gitlab-legacy#contributors).
